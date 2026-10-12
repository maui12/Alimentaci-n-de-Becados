import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
  },

  header: {
    minHeight: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },

  menuButton: {
    width: 42,
    height: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  menuIcon: {
    color: colors.orange,
    fontSize: 27,
  },

  headerTitle: {
    flex: 1,
    marginLeft: 8,
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },

  headerSpacer: {
    width: 8,
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  drawer: {
    width: '82%',
    maxWidth: 320,
    flex: 1,
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },

  drawerHeader: {
    minHeight: 100,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  brandContainer: {
    flex: 1,
    gap: 5,
  },

  brandTitle: {
    color: colors.orange,
    fontSize: 18,
    fontWeight: '700',
  },

  brandSubtitle: {
    color: '#89877E',
    fontSize: 12,
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },

  closeIcon: {
    color: colors.orange,
    fontSize: 28,
    lineHeight: 30,
  },

  menuList: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },

  menuOption: {
    minHeight: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },

  menuOptionPressed: {
    backgroundColor: colors.orangeSoft,
  },

  menuOptionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },

  optionArrow: {
    color: colors.orange,
    fontSize: 24,
  },

  drawerFooter: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  footerText: {
    color: '#89877E',
    fontSize: 11,
  },
});

export default styles;
