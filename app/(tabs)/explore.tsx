import { Button, Dialog } from "heroui-native";
import React from "react";
import { StyleSheet, View } from "react-native";

const Explore = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <View className="flex-1 justify-center items-center">
      <Dialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Title>...</Dialog.Title>
            <Dialog.Description>...</Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Explore;
