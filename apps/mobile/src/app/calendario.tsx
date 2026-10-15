import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HOY_DEMO, claveFecha, obtenerMesEjemplo } from '../calendarioEjemplo';

const NOMBRES_MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const NOMBRES_DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const CABECERA_SEMANA = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const COLORES = {
  fondo: '#0a1222',
  tarjeta: 'rgba(255,255,255,0.04)',
  borde: 'rgba(148,163,184,0.25)',
  texto: '#e8eef8',
  textoSuave: '#94a3b8',
  celeste: '#38bdf8',
  celesteFondo: 'rgba(56,189,248,0.16)',
  ambar: '#fbbf24',
  ambarFondo: 'rgba(251,191,36,0.14)',
};

export default function CalendarioScreen() {
  const claveHoy = claveFecha(HOY_DEMO);

  const [anio, setAnio] = useState(HOY_DEMO.getFullYear());
  const [mes, setMes] = useState(HOY_DEMO.getMonth() + 1); // 1 a 12
  const [seleccionado, setSeleccionado] = useState<string | null>(claveHoy);

  // Más adelante: reemplazar esta línea por una llamada al backend
  const datos = useMemo(() => obtenerMesEjemplo(anio, mes), [anio, mes]);

  const cambiarMes = (delta: number) => {
    const nueva = new Date(anio, mes - 1 + delta, 1);
    setAnio(nueva.getFullYear());
    setMes(nueva.getMonth() + 1);
  };

  const irAHoy = () => {
    setAnio(HOY_DEMO.getFullYear());
    setMes(HOY_DEMO.getMonth() + 1);
    setSeleccionado(claveHoy);
  };

  // Huecos antes del día 1 (la semana empieza en lunes)
  const huecos = (new Date(anio, mes - 1, 1).getDay() + 6) % 7;
  const diaSeleccionado = datos.dias.find((d) => d.fecha === seleccionado) ?? null;

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.titulo}>Calendario</Text>
      <Text style={estilos.subtitulo}>
        Sábados, domingos y feriados exigen guardia de 24 horas
      </Text>

      {/* Navegación del mes */}
      <View style={estilos.navegacion}>
        <Pressable
          style={estilos.botonNav}
          onPress={() => cambiarMes(-1)}
          accessibilityRole="button"
          accessibilityLabel="Mes anterior"
        >
          <Text style={estilos.botonNavTexto}>‹</Text>
        </Pressable>

        <Text style={estilos.mes}>
          {NOMBRES_MESES[mes - 1]} {anio}
        </Text>

        <Pressable
          style={estilos.botonNav}
          onPress={() => cambiarMes(1)}
          accessibilityRole="button"
          accessibilityLabel="Mes siguiente"
        >
          <Text style={estilos.botonNavTexto}>›</Text>
        </Pressable>

        <Pressable style={estilos.botonHoy} onPress={irAHoy} accessibilityRole="button">
          <Text style={estilos.botonHoyTexto}>Hoy</Text>
        </Pressable>
      </View>

      {/* Leyenda */}
      <View style={estilos.leyenda}>
        <View style={estilos.leyendaItem}>
          <View style={[estilos.punto, { backgroundColor: COLORES.celeste }]} />
          <Text style={estilos.leyendaTexto}>Normal</Text>
        </View>
        <View style={estilos.leyendaItem}>
          <View style={[estilos.punto, { backgroundColor: COLORES.ambar }]} />
          <Text style={estilos.leyendaTexto}>24 h</Text>
        </View>
      </View>

      {/* Grilla del mes */}
      <View style={estilos.tarjeta}>
        <View style={estilos.fila}>
          {CABECERA_SEMANA.map((letra, i) => (
            <View key={`cab-${i}`} style={estilos.celdaContenedor}>
              <Text style={[estilos.cabeceraDia, i >= 5 && { color: COLORES.ambar }]}>{letra}</Text>
            </View>
          ))}
        </View>

        <View style={estilos.fila}>
          {Array.from({ length: huecos }, (_, i) => (
            <View key={`hueco-${i}`} style={estilos.celdaContenedor} />
          ))}

          {datos.dias.map((d) => {
            const es24h = d.tipo === '24h';
            const esHoy = d.fecha === claveHoy;
            const esSeleccionado = d.fecha === seleccionado;

            return (
              <View key={d.fecha} style={estilos.celdaContenedor}>
                <Pressable
                  onPress={() => setSeleccionado(d.fecha)}
                  accessibilityRole="button"
                  accessibilityLabel={`Día ${d.dia}, ${
                    es24h ? 'guardia de 24 horas' : 'turno normal'
                  }${d.turnos > 0 ? `, ${d.turnos} becados con turno` : ''}`}
                  accessibilityState={{ selected: esSeleccionado }}
                  style={[
                    estilos.celda,
                    es24h && estilos.celda24h,
                    esHoy && estilos.celdaHoy,
                    esSeleccionado && estilos.celdaSeleccionada,
                  ]}
                >
                  <Text style={estilos.celdaNumero}>{d.dia}</Text>
                  <Text style={[estilos.celdaDetalle, es24h && { color: COLORES.ambar }]}>
                    {esHoy ? 'HOY' : es24h ? '24h' : d.turnos > 0 ? d.turnos : ''}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>

      {/* Detalle del día seleccionado */}
      {diaSeleccionado && (
        <View style={estilos.tarjeta}>
          <Text style={estilos.detalleTitulo}>
            {NOMBRES_DIAS[new Date(anio, mes - 1, diaSeleccionado.dia).getDay()]}{' '}
            {diaSeleccionado.dia} de {NOMBRES_MESES[mes - 1].toLowerCase()}
          </Text>

          <Text
            style={[
              estilos.detalleTipo,
              diaSeleccionado.tipo === '24h' && {
                color: COLORES.ambar,
                backgroundColor: COLORES.ambarFondo,
              },
            ]}
          >
            {diaSeleccionado.tipo === '24h' ? 'Guardia de 24 h' : 'Turno normal'}
          </Text>

          <Text style={estilos.detalleTexto}>
            {diaSeleccionado.turnos > 0
              ? `${diaSeleccionado.turnos} becados con turno este día.`
              : 'Aún no hay becados asignados a este día.'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  contenido: { padding: 16, paddingBottom: 32, gap: 14 },

  titulo: { color: COLORES.texto, fontSize: 28, fontWeight: '600' },
  subtitulo: { color: COLORES.textoSuave, fontSize: 14, marginTop: -8 },

  navegacion: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mes: {
    flex: 1,
    color: COLORES.texto,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  botonNav: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.tarjeta,
  },
  botonNavTexto: { color: COLORES.texto, fontSize: 22, lineHeight: 24 },
  botonHoy: {
    height: 40,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.tarjeta,
  },
  botonHoyTexto: { color: COLORES.texto, fontSize: 14 },

  leyenda: { flexDirection: 'row', gap: 16 },
  leyendaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  leyendaTexto: { color: COLORES.textoSuave, fontSize: 13 },
  punto: { width: 8, height: 8, borderRadius: 4 },

  tarjeta: {
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.tarjeta,
  },
  fila: { flexDirection: 'row', flexWrap: 'wrap' },
  // 100% / 7 columnas
  celdaContenedor: { width: '14.2857%', padding: 2 },
  cabeceraDia: {
    color: COLORES.textoSuave,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 4,
  },
  celda: {
    aspectRatio: 1,
    padding: 4,
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.tarjeta,
  },
  celda24h: { backgroundColor: COLORES.ambarFondo, borderColor: 'rgba(251,191,36,0.45)' },
  celdaHoy: { borderColor: COLORES.celeste },
  celdaSeleccionada: {
    backgroundColor: COLORES.celesteFondo,
    borderColor: COLORES.celeste,
    borderWidth: 2,
  },
  celdaNumero: { color: COLORES.texto, fontSize: 14, fontWeight: '600' },
  celdaDetalle: { color: COLORES.celeste, fontSize: 10 },

  detalleTitulo: {
    color: COLORES.texto,
    fontSize: 17,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  detalleTipo: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    color: COLORES.celeste,
    backgroundColor: COLORES.celesteFondo,
    fontSize: 13,
    fontWeight: '500',
  },
  detalleTexto: { color: COLORES.textoSuave, fontSize: 14 },
});