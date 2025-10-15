import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export type BackgroundCarouselProps = {
  intervalMs?: number; // intervalo entre cambios
  fadeDuration?: number; // duración del fade
};

// Carrusel de fondo con transición de desvanecido y doble buffer simple
export default function BackgroundCarousel({
  intervalMs = 8000,
  fadeDuration = 4000,
}: BackgroundCarouselProps) {
  const sources = [
    require("../assets/images/yucatan-1.jpg"),
    require("../assets/images/yucatan-2.webp"),
    require("../assets/images/yucatan-3.jpg"),
    require("../assets/images/yucatan-4.jpg"),
    require("../assets/images/yucatan-5.jpg"),
  ];
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState(sources.length > 1 ? 1 : 0);
  const currentRef = useRef(0);
  const fade = useRef(new Animated.Value(0)).current; // 0 -> muestra actual, 1 -> muestra siguiente

  const hasMultiple = sources.length > 1;

  // Mantener ref sincronizado para evitar cierres obsoletos en el ciclo
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (!hasMultiple) return; // Nada que animar si hay 1 imagen

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let rafId: number | null = null;

    const runCycle = () => {
      if (cancelled) return;
      // animar transición: actual (abajo) -> siguiente (arriba con fade in)
      const nextIdx = (currentRef.current + 1) % sources.length;
      setIncoming(nextIdx); // fijar la imagen entrante para este ciclo
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished || cancelled) return;
        // finalizada la animación, consolidar siguiente como actual
        setCurrent(nextIdx);
        // Importante: esperar 1 frame para asegurar que la imagen base
        // ha renderizado el nuevo source antes de ocultar la capa superior,
        // así evitamos el parpadeo al final de la transición.
        rafId = requestAnimationFrame(() => {
          if (cancelled) return;
          fade.setValue(0);
        });
        // esperar al siguiente intervalo antes de volver a animar
        timeoutId = setTimeout(runCycle, intervalMs);
      });
    };

    // iniciar después del primer intervalo para evitar cambio inmediato
    timeoutId = setTimeout(runCycle, intervalMs);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      // detener cualquier animación en curso
      fade.stopAnimation();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [fade, fadeDuration, intervalMs, hasMultiple, sources.length]);

  return (
    <View
      style={StyleSheet.absoluteFillObject}
      pointerEvents="none">
      {/* Imagen actual (base) */}
      <Image
        source={sources[current]}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        // Evitar doble transición: usamos Animated para el fade
        transition={0}
        cachePolicy="memory"
      />

      {/* Imagen siguiente (encima) con opacidad animada */}
      {hasMultiple && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: fade,
              // Hints para evitar parpadeos al componer capas con alpha
              // (crea layer separado y rasteriza durante la animación)
              // @ts-ignore - propiedades de estilo específicas por plataforma
              renderToHardwareTextureAndroid: true,
              // @ts-ignore - propiedades de estilo específicas por plataforma
              shouldRasterizeIOS: true,
              backfaceVisibility: "hidden",
            },
          ]}>
          <Image
            source={sources[incoming]}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            // Evitar doble transición: usamos Animated para el fade
            transition={0}
            cachePolicy="memory"
          />
        </Animated.View>
      )}
    </View>
  );
}
