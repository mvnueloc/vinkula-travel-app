import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { useCategoryStore } from "@/store/categoriesStore";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Skeleton } from "heroui-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Category = {
  idCategory: string | number;
  name: string;
};

export default function DialogNativeModalScreen() {
  const {
    categories,
    checkCategories,
    getCategories,
    clearCategories,
    updateCategories,
  } = useCategoryStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // 1) Intenta cargar desde el storage
      const hasLocal = await checkCategories();
      // 2) Si no hay nada local, trae del backend
      if (!hasLocal) {
        await getCategories();
      }
      setIsLoading(false);
    };
    init();
    // Notar: no dependemos de 'categories' aquí para evitar loops
  }, [checkCategories, getCategories]);

  // const handleSummit = async () => {
  //   const res = await getCategories();
  //   setCategories(Array.isArray(res) ? res : []);
  // };

  const handleCategoryPress = (category: Category) => {
    const id = String(category.idCategory);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      // Log con el valor actualizado para evitar estado stale
      console.log("Selected IDs:", Array.from(next));
      return next;
    });
  };

  const handleClearCategories = () => {
    clearCategories();
    console.log("Categories cleared");
  };

  const handleUpdateCategories = async () => {
    setIsLoading(true);
    await updateCategories();
    setIsLoading(false);
  };

  return (
    <View className="px-5 relative h-screen">
      {/* Imagen de fondo */}
      <BackgroundCarousel />
      {/* Degradado negro arriba a transparente abajo */}
      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.0)"]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View className="mb-4 mt-8">
        <Text className="text-2xl font-semibold text-gray-200">
          Mis Categorías Favoritas
        </Text>
        <Text className="text-gray-300">
          Selecciona tus categorías favoritas con las cuales personalizaremos tu
          experiencia.
        </Text>
      </View>
      {isLoading ? (
        // Skeleton loading state
        <View className="items-center justify-center mt-4">
          <View className="w-full gap-3">
            <Skeleton
              className="h-10 w-full rounded-lg"
              isLoading={isLoading}
              animationType="shimmer"
              shimmerConfig={{
                duration: 2000,
                speed: 2,
                highlightColor: "rgba(59, 130, 246, 0.3)",
              }}>
              <View className="h-16 bg-blue-500 rounded-lg items-center justify-center">
                <Text className="text-white">Blue Shimmer</Text>
              </View>
            </Skeleton>

            <Skeleton
              className="h-10 w-full rounded-lg"
              isLoading={isLoading}
              animationType="shimmer"
              shimmerConfig={{
                duration: 1000,
                speed: 2,
                highlightColor: "rgba(34, 197, 94, 0.3)",
              }}>
              <View className="h-16 bg-green-500 rounded-lg items-center justify-center">
                <Text className="text-white">Fast Green Shimmer</Text>
              </View>
            </Skeleton>

            <Skeleton
              className="h-10 w-full rounded-lg"
              isLoading={isLoading}
              animationType="shimmer"
              shimmerConfig={{
                duration: 1000,
                speed: 2,
                highlightColor: "rgba(34, 197, 94, 0.3)",
              }}>
              <View className="h-16 bg-green-500 rounded-lg items-center justify-center">
                <Text className="text-white">Fast Green Shimmer</Text>
              </View>
            </Skeleton>

            <Skeleton
              className="h-10 w-full rounded-lg"
              isLoading={isLoading}
              animationType="shimmer"
              shimmerConfig={{
                duration: 1000,
                speed: 2,
                highlightColor: "rgba(34, 197, 94, 0.3)",
              }}>
              <View className="h-16 bg-green-500 rounded-lg items-center justify-center">
                <Text className="text-white">Fast Green Shimmer</Text>
              </View>
            </Skeleton>
          </View>
        </View>
      ) : (
        // Categories list
        <>
          <View className="flex-row flex-wrap gap-2 mt-4">
            {categories?.map((category: Category) => {
              const isSelected = selectedIds.has(String(category.idCategory));
              return (
                <Button
                  key={category.idCategory}
                  size="sm"
                  variant={isSelected ? "primary" : "secondary"}
                  className={
                    isSelected ? "border border-blue-600 bg-blue-600/40" : ""
                  }
                  onPress={() => handleCategoryPress(category)}>
                  <Button.LabelContent className="text-black">
                    {category.name}
                  </Button.LabelContent>
                </Button>
              );
            })}
          </View>
          {/* Botones de acción */}
          <View className="flex-row w-full justify-end mt-8">
            <Button onPress={handleUpdateCategories}>
              Buscar nuevas categorias
            </Button>
          </View>
        </>
      )}
    </View>
  );
}
