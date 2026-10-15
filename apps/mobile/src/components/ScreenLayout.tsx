import type { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import AppHeader from '@/components/AppHeader/AppHeader';
import { Colors } from '@/constants/theme';

type ScreenLayoutProps = {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
};

export default function ScreenLayout({
  titulo,
  subtitulo,
  children,
}: ScreenLayoutProps) {
  return (
    <View style={styles.contenedor}>
      <AppHeader
        titulo={titulo}
        subtitulo={subtitulo}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: Colors.admin.fondo,
  },
  scroll: {
    flex: 1,
  },
  contenido: {
    flexGrow: 1,
  },
});