import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Button, Dialog, TextField, useDialog } from "heroui-native";
import { FC, PropsWithChildren, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DialogBlurBackdrop } from "./dialog-blur-backdrop";

type DialogTextInputProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const CustomAnimatedContent: FC<PropsWithChildren> = ({ children }) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const insetTop = insets.top + 12;
  const maxTextInputDialogHeight = (height - insetTop) / 2;

  const { progress, isDragging } = useDialog();

  const rContainerStyle = useAnimatedStyle(() => {
    if (isDragging.get()) {
      return {
        borderRadius: interpolate(
          progress.get(),
          [1, 1.25],
          [18, 42],
          Extrapolation.CLAMP
        ),
      };
    }

    return {
      opacity: interpolate(progress.get(), [0, 1, 2], [0, 1, 0]),
      transform: [
        {
          scaleX: interpolate(
            progress.get(),
            [0, 1, 2],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Dialog.Content
      className="bg-surface-1 rounded-xl"
      style={[
        { marginTop: insetTop, maxHeight: maxTextInputDialogHeight },
        rContainerStyle,
      ]}
      isDefaultAnimationDisabled>
      {children}
    </Dialog.Content>
  );
};

{
  /* Dialog with Custom Content */
}
export const DialogTextInput: FC<DialogTextInputProps> = ({
  isOpen,
  onOpenChange,
}) => {
  // Soporte controlado/no controlado
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleOpenChange = (next: boolean) => {
    onOpenChange?.(next);
    if (isOpen === undefined) {
      setInternalOpen(next);
    }

    // Al cerrar, limpiar formulario/errores
    if (!next) {
      setName("");
      setEmail("");
      setNameError("");
      setEmailError("");
    }
  };

  const handleSubmit = () => {
    let valid = true;
    if (name.trim() === "") {
      setNameError("Name is required.");
      valid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is required.");
      valid = false;
    }
    if (valid) {
      // Handle valid form submission
      console.log("Profile Updated:", { name, email });
      handleOpenChange(false);
    }
  };

  return (
    <Dialog
      isOpen={open}
      onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        {/* <Button>Edit Profile</Button> */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit Profile"
          hitSlop={8}
          className="items-center flex-row justify-between w-full">
          <View className="flex-row gap-2">
            <MaterialIcons
              name="inventory-2"
              size={20}
              color="black"
            />
            <Text className="text-lg">Edit Profile</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={"black"}
          />
        </Pressable>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay isDefaultAnimationDisabled>
          <DialogBlurBackdrop />
        </Dialog.Overlay>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={24}>
          <CustomAnimatedContent>
            <Dialog.Close className="self-end" />
            <View className="mb-6 gap-1.5">
              <Dialog.Title>Update Profile</Dialog.Title>
              <Dialog.Description>
                Update your profile information. All fields are required.
              </Dialog.Description>
            </View>

            <View className="h-[200px]">
              <ScrollView contentContainerClassName="gap-5">
                <TextField
                  isRequired
                  isInvalid={!!nameError}>
                  <TextField.Label isInvalid={false}>Full Name</TextField.Label>
                  <TextField.Input
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (nameError) setNameError("");
                    }}
                    autoCapitalize="words"
                    autoCorrect
                    autoFocus
                    isInvalid={false}
                  />
                  <TextField.ErrorMessage>{nameError}</TextField.ErrorMessage>
                </TextField>

                <TextField
                  isRequired
                  isInvalid={!!emailError}>
                  <TextField.Label isInvalid={false}>
                    Email Address
                  </TextField.Label>
                  <TextField.Input
                    placeholder="email@example.com"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (emailError) setEmailError("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    isInvalid={false}
                  />
                  <TextField.ErrorMessage>{emailError}</TextField.ErrorMessage>
                </TextField>
              </ScrollView>
            </View>

            <View className="flex-row justify-end gap-3">
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    handleOpenChange(false);
                  }}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                size="sm"
                onPress={handleSubmit}>
                Update Profile
              </Button>
            </View>
          </CustomAnimatedContent>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );
};
