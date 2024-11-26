const paletteData = [
    { // Thème 1 - Couleurs de base
        primary: '#EF476F', // Couleur principale (rouge vif)
        secondary: '#26547C', // Couleur secondaire (bleu profond)
        tertiary: '#FFD166', // Couleur tertiaire (jaune)

        // bg
        bgbutton1: '#FFFFFF',
        bgApp: '#F0F0F0',

        // Statuts spécifiques
        statusEmpty: '#94A8B9', // Couleur pour "Empty"
        statusDone: '#F4CBD5', // Couleur pour "Done"
        statusInProgress: '#FFD166', // Couleur pour "In Progress"

        // Couleurs de texte
        textLight: '#FFFFFF', // Texte clair
        textDark: '#000000', // Texte sombre
        textHighlight: '#EF476F', // Texte en surbrillance

        // Arrière-plans et overlays
        overlay: 'rgba(0, 0, 0, 0.5)', // Overlay semi-transparent
        popupBackground: '#e0e0e0bb', // Fond du popup
        separator: '#FFFFFF', // Séparateur

        // Bouton "Fermer"
        closeButtonBackground: '#FFFFFF', // Fond du bouton
        closeButtonColor: '#EF476F', // Couleur de l'icône du bouton "Fermer"
    },
    { // Thème 2 - Thème sombre
        primary: '#FFFFFF', // Couleur principale (noir profond)
        secondary: '#FFFFFF', // Couleur secondaire (gris foncé)
        tertiary: '#FFC107', // Couleur tertiaire (rouge éclatant)

        bgbutton1: '#333333',
        bgApp: '#292929',

        statusEmpty: '#6C757D', 
        statusDone: '#28A745', 
        statusInProgress: '#FFC107',

        textLight: '#F8F9FA', 
        textDark: '#212529', 
        textHighlight: '#17A2B8', 

        overlay: 'rgba(33, 37, 41, 0.85)', 
        popupBackground: '#e0e0e0bb',
        separator: '#6C757D', 

        closeButtonBackground: '#343A40',
        closeButtonColor: '#17A2B8', 
    },
    { // Thème 3 - Couleurs pastel
        primary: '#A8DADC', // Couleur principale (vert d'eau)
        secondary: '#457B9D', // Couleur secondaire (bleu doux)
        tertiary: '#F4A261', // Couleur tertiaire (orange pastel)

        bgbutton1: '#F1FAEE',
        bgApp: '#F0F0F0',

        statusEmpty: '#A8A8A8', 
        statusDone: '#81B29A', 
        statusInProgress: '#F2CC8F',

        textLight: '#FFFFFF', 
        textDark: '#FFFFFF', 
        textHighlight: '#E63946',

        overlay: 'rgba(255, 255, 255, 0.7)',
        popupBackground: '#e0e0e0bb',
        separator: '#457B9D',

        closeButtonBackground: '#F1FAEE',
        closeButtonColor: '#E63946',
    },
    { // Thème 4 - Dark and White
        primary: '#FFFFFF', // Couleur principale (blanc pur)
        secondary: '#ffffff', // Couleur secondaire (noir intense)
        tertiary: '#C0C0C0', // Couleur tertiaire (gris clair)

        bgbutton1: '#1C1C1C', // Fond des boutons (noir)
        bgApp: '#292929',

        statusEmpty: '#030303', // Statut "Empty" (gris moyen)
        statusDone: '#292929', // Statut "Done" (blanc)
        statusInProgress: '#C0C0C0', // Statut "In Progress" (gris clair)

        textLight: '#FFFFFF', // Texte clair (pour fond sombre)
        textDark: '#292929', // Texte sombre (pour fond clair)
        textHighlight: '#FFFFFF', // Texte en surbrillance (blanc)

        overlay: 'rgba(255, 255, 255, 0.1)', // Overlay semi-transparent blanc
        popupBackground: '#e0e0e0bb', // Fond du popup (gris foncé)
        separator: '#FFFFFF', // Séparateur (blanc)

        closeButtonBackground: '#FFFFFF', // Fond du bouton "Fermer" (blanc)
        closeButtonColor: '#000000', // Couleur de l'icône du bouton "Fermer" (noir)
    },
    { // Thème 5 - Bélier (Aries)
        primary: '#FF5733', // Rouge éclatant
        secondary: '#900C3F', // Bordeaux
        tertiary: '#FFC300', // Jaune vif
        bgbutton1: '#FFBD69',
        bgApp: '#F5F5DC', // Beige
        statusEmpty: '#C0C0C0',
        statusDone: '#FF6F61',
        statusInProgress: '#FFA500',
        textLight: '#FFFFFF',
        textDark: '#2C2C2C',
        textHighlight: '#FF5733',
        overlay: 'rgba(255, 87, 51, 0.4)',
        popupBackground: '#FFF8E7',
        separator: '#FF5733',
        closeButtonBackground: '#900C3F',
        closeButtonColor: '#FFFFFF',
    },
    { // Thème 6 - Taureau (Taurus)
        primary: '#4CAF50', // Vert nature
        secondary: '#8BC34A', // Vert clair
        tertiary: '#795548', // Brun terre
        bgbutton1: '#D7CCC8',
        bgApp: '#F0F4C3',
        statusEmpty: '#A5D6A7',
        statusDone: '#4CAF50',
        statusInProgress: '#222222',
        textLight: '#FFFFFF',
        textDark: '#1B5E20',
        textHighlight: '#8BC34A',
        overlay: 'rgba(76, 175, 80, 0.3)',
        popupBackground: '#E8F5E9',
        separator: '#4CAF50',
        closeButtonBackground: '#795548',
        closeButtonColor: '#FFFFFF',
    },
    { // Thème 7 - Gémeaux (Gemini)
        primary: '#2196F3', // Bleu éclatant
        secondary: '#E91E63', // Rose vif
        tertiary: '#FFEB3B', // Jaune brillant
        bgbutton1: '#BBDEFB',
        bgApp: '#F3E5F5',
        statusEmpty: '#90CAF9',
        statusDone: '#F06292',
        statusInProgress: '#FFD740',
        textLight: '#FFFFFF',
        textDark: '#212121',
        textHighlight: '#2196F3',
        overlay: 'rgba(33, 150, 243, 0.3)',
        popupBackground: '#FFFDE7',
        separator: '#2196F3',
        closeButtonBackground: '#E91E63',
        closeButtonColor: '#FFFFFF',
    },
    { // Thème 8 - Cancer
        primary: '#673AB7', // Violet mystique
        secondary: '#3F51B5', // Bleu royal
        tertiary: '#FFC107', // Or
        bgbutton1: '#D1C4E9',
        bgApp: '#EDE7F6',
        statusEmpty: '#B39DDB',
        statusDone: '#FFAB91',
        statusInProgress: '#FFD54F',
        textLight: '#FFFFFF',
        textDark: '#212121',
        textHighlight: '#673AB7',
        overlay: 'rgba(103, 58, 183, 0.3)',
        popupBackground: '#F3E5F5',
        separator: '#673AB7',
        closeButtonBackground: '#3F51B5',
        closeButtonColor: '#FFFFFF',
    },
    { // Thème 9 - Lion (Leo)
        primary: '#FF8C00', // Orange intense
        secondary: '#FF4500', // Rouge feu
        tertiary: '#FFD700', // Or royal
        bgbutton1: '#FFE4B5',
        bgApp: '#FFF5E1',
        statusEmpty: '#FFD59A',
        statusDone: '#FFA726',
        statusInProgress: '#FFD740',
        textLight: '#FFFFFF',
        textDark: '#212121',
        textHighlight: '#FF8C00',
        overlay: 'rgba(255, 140, 0, 0.3)',
        popupBackground: '#FFF8E1',
        separator: '#FF8C00',
        closeButtonBackground: '#FF4500',
        closeButtonColor: '#FFFFFF',
    },
];

export const palette = paletteData;

// Initialize themeColors with the default theme (first palette)
const savedThemeIndex = localStorage.getItem('selectedThemeIndex');
const initialThemeIndex = savedThemeIndex ? parseInt(savedThemeIndex) : 0;

export const themeColors = {
    ...palette[initialThemeIndex]
};
