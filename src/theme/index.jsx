const paletteData = [
    {
        // Thème Default - Light and Bright
        primary: '#000000', // Couleur principale (noir pur)
        secondary: '#1C1C1C', // Couleur secondaire (gris très foncé)
        tertiary: '#292929', // Couleur tertiaire (gris sombre)
    
        bgbutton1: '#E0E0E0', // Fond des boutons (blanc cassé)
        bgApp: '#FFFFFF', // Fond de l'application (blanc pur)
    
        statusEmpty: '#F0F0F0', // Statut "Empty" (gris très clair)
        statusDone: '#F8F8E8', // Statut "Done" (blanc pur)
        statusInProgress: '#FFFFFF', // Statut "In Progress" (gris pâle)
    
        textLight: '#1C1C1C', // Texte clair (pour fond clair)
        textDark: '#FFFFFF', // Texte sombre (pour fond sombre)
        textHighlight: '#000000', // Texte en surbrillance (noir)
    
        overlay: 'rgba(0, 0, 0, 0.1)', // Overlay semi-transparent noir
        popupBackground: '#1C1C1Cbb', // Fond du popup (gris très foncé)
        separator: '#000000', // Séparateur (noir)
    
        closeButtonBackground: '#000000', // Fond du bouton "Fermer" (noir)
        closeButtonColor: '#FFFFFF', // Couleur de l'icône du bouton "Fermer" (blanc)
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
    { 
        // Thème LinkedIn
        primary: '#0077B5', // Couleur principale (bleu LinkedIn)
        secondary: '#FFFFFF', // Couleur secondaire (blanc pur)
        tertiary: '#F3F6F8', // Couleur tertiaire (gris clair pour les fonds)

        bgbutton1: '#F2F2F2', // Fond des boutons (bleu foncé pour CTA)
        bgApp: '#F3F6F8', // Fond de l'application (gris clair)

        statusEmpty: '#CCCCCC', // Statut "Empty" (gris neutre)
        statusDone: '#000000', // Statut "Done" (bleu LinkedIn)
        statusInProgress: '#005582', // Statut "In Progress" (bleu plus sombre)

        textLight: '#FFFFFF', // Texte clair (pour fond bleu)
        textDark: '#212121', // Texte sombre (pour fond clair)
        textHighlight: '#0077B5', // Texte en surbrillance (bleu LinkedIn)

        overlay: 'rgba(0, 119, 181, 0.1)', // Overlay semi-transparent bleu
        popupBackground: '#FFFFFF', // Fond du popup (blanc pur)
        separator: '#E6E9EC', // Séparateur (gris clair)

        closeButtonBackground: '#FFFFFF', // Fond du bouton "Fermer" (blanc)
        closeButtonColor: '#0077B5', // Couleur de l'icône du bouton "Fermer" (bleu LinkedIn)
    },
    {
        // Thème WhatsApp
        primary: '#25D366', // Couleur principale (vert WhatsApp)
        secondary: '#075E54', // Couleur secondaire (vert foncé)
        tertiary: '#DCF8C6', // Couleur tertiaire (vert pâle pour les bulles de message)

        bgbutton1: '#F2F2F2', // Fond des boutons (vert moyen)
        bgApp: '#ECE5DD', // Fond de l'application (gris clair/beige)

        statusEmpty: '#0CE5DD', // Statut "Empty" (beige clair)
        statusDone: '#ECE5DD', // Statut "Done" (vert WhatsApp)
        statusInProgress: '#128C7E', // Statut "In Progress" (vert foncé)

        textLight: '#FFFFFF', // Texte clair (pour fond vert)
        textDark: '#303030', // Texte sombre (pour fond clair)
        textHighlight: '#25D366', // Texte en surbrillance (vert WhatsApp)

        overlay: 'rgba(7, 94, 84, 0.1)', // Overlay semi-transparent vert foncé
        popupBackground: '#FFFFFF', // Fond du popup (blanc pur)
        separator: '#CCCCCC', // Séparateur (gris neutre)

        closeButtonBackground: '#FFFFFF', // Fond du bouton "Fermer" (blanc)
        closeButtonColor: '#128C7E', // Couleur de l'icône du bouton "Fermer" (vert foncé)
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
    { // Thème 5 - Bélier (Aries)
        primary: '#FF5733', // Rouge éclatant
        secondary: '#900C3F', // Bordeaux
        tertiary: '#FFC300', // Jaune vif
        bgbutton1: '#FFBD69',
        bgApp: '#F5F5DC', // Beige
        statusEmpty: '#C0C0C0',
        statusDone: '#020202',
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
        bgbutton1: '#F1F1F1',
        bgApp: '#F0F4C3',
        statusEmpty: '#A5D6A7',
        statusDone: '#3C8000',
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
