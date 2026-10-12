
import { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import styles from './AppHeader.styles';

export const opcionesMenu = [
  'Panel',
  'Calendario',
  'Becados',
  'Pedidos',
  'Informes',
  'Configuración',
] as const;

export type OpcionMenu = (typeof opcionesMenu)[number];

interface AppHeaderProps {
  titulo?: string;
  onNavigate: (opcion: OpcionMenu) => void;
}

function AppHeader({
  titulo = 'Administración',
  onNavigate,
}: AppHeaderProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const seleccionarOpcion = (opcion: OpcionMenu) => {
    setMenuAbierto(false);
    onNavigate(opcion);
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.menuButton}
            onPress={() => setMenuAbierto(true)}
            accessibilityRole="button"
            accessibilityLabel="Abrir menú de navegación"
            hitSlop={8}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>

          <Text style={styles.headerTitle} numberOfLines={1}>
            {titulo}
          </Text>

          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>

      <Modal
        visible={menuAbierto}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setMenuAbierto(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setMenuAbierto(false)}
            accessibilityLabel="Cerrar menú"
            accessibilityRole="button"
          />

          <SafeAreaView style={styles.drawer}>
            <View style={styles.drawerHeader}>
              <View style={styles.brandContainer}>
                <Text style={styles.brandTitle}>UCN · FAMED</Text>
                <Text style={styles.brandSubtitle}>
                  Panel de administración
                </Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() => setMenuAbierto(false)}
                accessibilityRole="button"
                accessibilityLabel="Cerrar menú"
                hitSlop={8}
              >
                <Text style={styles.closeIcon}>×</Text>
              </Pressable>
            </View>

            <View style={styles.menuList}>
              {opcionesMenu.map((opcion) => (
                <Pressable
                  key={opcion}
                  style={({ pressed }) => [
                    styles.menuOption,
                    pressed && styles.menuOptionPressed,
                  ]}
                  onPress={() => seleccionarOpcion(opcion)}
                  accessibilityRole="button"
                >
                  <Text style={styles.menuOptionText}>
                    {opcion}
                  </Text>

                  <Text style={styles.optionArrow}>›</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.drawerFooter}>
              <Text style={styles.footerText}>
                Universidad Católica del Norte
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

export default AppHeader;
