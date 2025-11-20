import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { useAuthStore } from "@/store/authStore";
import { useCategoryStore } from "@/store/categoriesStore";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card, Skeleton, Spinner, TextField } from "heroui-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const baseUrl = process.env.EXPO_PUBLIC_API_URL_PROV;

const IndexProvider = () => {
  const { user, updateUser } = useAuthStore();
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAdress] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  // Estados de error para validación
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [latitudError, setLatitudError] = useState(false);
  const [longitudError, setLongitudError] = useState(false);
  // Categorías seleccionadas
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // image picker
  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  type DestinationImage = { base64: string };

  const idProvider = user?.idUser;

  type Destination = {
    idProvider: string;
    name: string;
    description: string;
    address: string;
    latitud: number;
    longitud: number;
    imagesBase64: string[];
    categories: string[];
  };

  const destination: Destination = {
    idProvider: idProvider || "",
    name,
    description,
    address,
    latitud: parseFloat(latitud),
    longitud: parseFloat(longitud),
    imagesBase64: [],
    categories: [],
  };

  const handleUpdateProfile = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (!name) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
      destination.name = name;
    }

    if (!description) {
      setDescriptionError(true);
      return;
    } else {
      setDescriptionError(false);
      destination.description = description;
    }

    if (!address) {
      setAddressError(true);
      return;
    } else {
      setAddressError(false);
      destination.address = address;
      true;
    }

    if (!latitud || isNaN(Number(latitud))) {
      setLatitudError(true);
      return;
    } else {
      setLatitudError(false);
      destination.latitud = parseFloat(latitud);
    }

    if (!longitud || isNaN(Number(longitud))) {
      setLongitudError(true);
      return;
    } else {
      setLongitudError(false);
      destination.longitud = parseFloat(longitud);
    }

    if (images.length === 0) {
      Alert.alert(
        "Imágenes requeridas",
        "Por favor, seleccione al menos una imagen para el destino."
      );
      return;
    } else {
      destination.imagesBase64 = Array.from(images);
      // console.log(destination.images);
    }

    if (selectedIds.size === 0) {
      Alert.alert(
        "Categorías requeridas",
        "Por favor, seleccione al menos una categoría para el destino."
      );
      return;
    } else {
      destination.categories = Array.from(selectedIds);
      // console.log(destination.categories);
    }

    setLoading(true);

    // console.log("Destino a enviar:", destination);

    try {
      console.log(
        "Sending create destination request to:",
        `${baseUrl}/create-destination`
      );
      const response = await fetch(`${baseUrl}/create-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destination),
      });

      console.log(destination);
      // console.log(response);

      if (!response.ok) {
        console.log(response);
        throw new Error("Created destination failed");
      }

      const data = await response.json();

      console.log("Create destination response data:", data);

      return true;
    } catch (error) {
      console.error("Create destination error:", error);
      return false;
    }
  };

  // Image picker

  const MAX_IMAGES = 6;

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      Alert.alert(
        "Límite alcanzado",
        `Solo puedes seleccionar hasta ${MAX_IMAGES} imágenes.`
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,
      selectionLimit: remainingSlots,
    });

    if (!result.canceled) {
      setImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.base64 as string),
      ]);

      // console.log(result.assets);
    }
  };

  // Categories

  type Category = {
    idCategory: string | number;
    name: string;
  };

  const {
    categories,
    checkCategories,
    getCategories,
    clearCategories,
    updateCategories,
  } = useCategoryStore();

  useEffect(() => {
    const init = async () => {
      // 1) Intenta cargar desde el storage
      const hasLocal = await checkCategories();
      console.log("Has local categories:", hasLocal);
      console.log("Categories loaded:", categories);
      // 2) Si no hay nada local, trae del backend
      if (!hasLocal) {
        await getCategories();
      }
      setLoading(false);
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

  const handleUpdateCategories = async () => {
    setLoading(true);
    await updateCategories();
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center relative h-screen">
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
          Crear nuevo destino
        </Text>
      </View>
      <Card className="w-11/12 max-w-md bg-black/75  border-blue-600 mt max-h-[70vh]">
        <ScrollView>
          <Card.Body>
            <Card.Description>
              {/* Nombre */}
              <TextField
                className="w-full"
                isRequired
                isInvalid={nameError}
                isDisabled={loading}>
                <TextField.Label>Nombre</TextField.Label>
                <TextField.Input
                  placeholder="Fondita Doña Panchita"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  colors={{
                    blurBorder: "",
                    focusBorder: "#3b82f6",
                    blurBackground: "#272727",
                    focusBackground: "#272727",
                  }}
                />
                <TextField.ErrorMessage>
                  Por favor ingrese un nombre válido
                </TextField.ErrorMessage>
              </TextField>
              {/* Descripción */}
              <TextField
                className="w-full"
                isRequired
                isInvalid={descriptionError}
                isDisabled={loading}>
                <TextField.Label>Descripción</TextField.Label>
                <TextField.Input
                  placeholder="Es un lugar ameno para comer en familia con comida típica y a buen precio."
                  multiline
                  value={description}
                  onChangeText={setDescription}
                  autoCapitalize="words"
                  colors={{
                    blurBorder: "",
                    focusBorder: "#3b82f6",
                    blurBackground: "#272727",
                    focusBackground: "#272727",
                  }}
                />
                <TextField.ErrorMessage>
                  Por favor ingrese una descripción válida
                </TextField.ErrorMessage>
              </TextField>
              {/* Dirección */}
              <TextField
                className="w-full"
                isRequired
                isInvalid={addressError}
                isDisabled={loading}>
                <TextField.Label>Dirección</TextField.Label>
                <TextField.Input
                  placeholder="Av. Siempre Viva 123, Springfield"
                  value={address}
                  onChangeText={setAdress}
                  autoCapitalize="words"
                  colors={{
                    blurBorder: "",
                    focusBorder: "#3b82f6",
                    blurBackground: "#272727",
                    focusBackground: "#272727",
                  }}
                />
                <TextField.ErrorMessage>
                  Por favor ingrese una dirección válida
                </TextField.ErrorMessage>
              </TextField>
              {/* Latitud */}
              <TextField
                className="w-full"
                isRequired
                isInvalid={latitudError}
                isDisabled={loading}>
                <TextField.Label>Latitud</TextField.Label>
                <TextField.Input
                  placeholder="-34.6037"
                  value={latitud}
                  onChangeText={setLatitud}
                  autoCapitalize="words"
                  colors={{
                    blurBorder: "",
                    focusBorder: "#3b82f6",
                    blurBackground: "#272727",
                    focusBackground: "#272727",
                  }}
                />
                <TextField.ErrorMessage>
                  Por favor ingrese una latitud válida
                </TextField.ErrorMessage>
              </TextField>
              {/* Longitud */}
              <TextField
                className="w-full"
                isRequired
                isInvalid={longitudError}
                isDisabled={loading}>
                <TextField.Label>Longitud</TextField.Label>
                <TextField.Input
                  placeholder="-58.3816"
                  value={longitud}
                  onChangeText={setLongitud}
                  autoCapitalize="words"
                  colors={{
                    blurBorder: "",
                    focusBorder: "#3b82f6",
                    blurBackground: "#272727",
                    focusBackground: "#272727",
                  }}
                />
                <TextField.ErrorMessage>
                  Por favor ingrese una longitud válida
                </TextField.ErrorMessage>
              </TextField>

              {/* Categories */}
              <View>
                <View>
                  <Text className="color-white font-semibold mt-3">
                    Categorias
                  </Text>
                  <Text className="text-gray-300">
                    Selecciona las categorías que describen mejor este lugar.
                  </Text>
                </View>
                {loading ? (
                  // Skeleton loading state
                  <View className="items-center justify-center mt-4">
                    <View className="w-full gap-3">
                      <Skeleton
                        className="h-10 w-full rounded-lg"
                        isLoading={loading}
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
                        isLoading={loading}
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
                        isLoading={loading}
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
                        isLoading={loading}
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
                        const isSelected = selectedIds.has(
                          String(category.idCategory)
                        );
                        return (
                          <Button
                            key={category.idCategory}
                            size="sm"
                            variant={isSelected ? "secondary" : "primary"}
                            className={
                              isSelected
                                ? "border border-blue-600 bg-blue-600/40"
                                : ""
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
                    <View className="flex-row w-full justify-center mt-8">
                      <Button
                        onPress={handleUpdateCategories}
                        variant="tertiary"
                        className="border-gray-500 w-full">
                        Buscar nuevas categorias
                      </Button>
                    </View>
                  </>
                )}
              </View>
              {/* Image picker */}
              <View className="flex-col justify-start mt-4">
                <View>
                  <Text className="color-white font-semibold mt-3">
                    Imágenes ({images.length} / {MAX_IMAGES})
                  </Text>
                </View>
                <View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-3">
                    {images.map((uri, index) => (
                      <Card
                        key={uri ?? index}
                        surfaceVariant="2"
                        className="flex-1 rounded-xl max-w-56 mr-4 h-full ">
                        <View className="gap-4 justify-center items-center">
                          <Card.Header>
                            <Image
                              source={{ uri: `data:image/jpeg;base64,${uri}` }}
                              style={{
                                height: 100,
                                aspectRatio: 1,
                                borderRadius: 12,
                              }}
                            />
                          </Card.Header>
                          <Button
                            size="sm"
                            variant="tertiary"
                            className="self-center mb-2 w-full"
                            onPress={() => handleRemoveImage(index)}>
                            Eliminar
                          </Button>
                        </View>
                      </Card>
                    ))}

                    {/* Card ghost al final para mostrar cuántas imágenes se pueden agregar */}
                    <Pressable
                      className="flex-1 rounded-xl max-w-48 mr-4 items-center justify-center border-dashed border-2 border-gray-500/70 bg-transparent mt-3 h-auto min-h-32"
                      onPress={pickImage}>
                      <View className="items-center justify-center px-3">
                        {images.length < MAX_IMAGES ? (
                          <Text className="text-xs text-gray-300 text-center">
                            Puedes agregar {MAX_IMAGES - images.length} imagen
                            {MAX_IMAGES - images.length === 1 ? "" : "es"} más
                          </Text>
                        ) : (
                          <Text className="text-xs text-gray-200 text-center">
                            Has alcanzado el máximo de {MAX_IMAGES} imágenes
                          </Text>
                        )}
                      </View>
                    </Pressable>
                  </ScrollView>
                </View>
              </View>
            </Card.Description>
            {/* Update Button */}
            {!loading && (
              <Button
                size="md"
                variant="primary"
                className="w-full mt-4"
                onPress={handleUpdateProfile}>
                Eviar a revisión
              </Button>
            )}

            {loading && (
              <Button
                isDisabled
                className="w-full mt-4">
                <Button.StartContent>
                  <Spinner
                    color={"white"}
                    size="sm"
                  />
                </Button.StartContent>
                <Button.LabelContent>
                  Enviando a revisión...
                </Button.LabelContent>
              </Button>
            )}
          </Card.Body>
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
};

export default IndexProvider;
