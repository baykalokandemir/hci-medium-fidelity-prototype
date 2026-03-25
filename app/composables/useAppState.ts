export const useAppState = () => {
    const sidebarCollapsed = useState('sidebarCollapsed', () => false)
    const libraryTab = useState('libraryTab', () => 'watching')
    const carouselIndex = useState('carouselIndex', () => 0)
    const saveListModal = useState('saveListModal', () => false)
    const user = useState('user', () => ({
        proficiency: 'Beginner',
        targetLanguage: 'Target Language'
    }))

    const toggleSidebar = () => {
        sidebarCollapsed.value = !sidebarCollapsed.value
    }

    const openSaveListModal = () => {
        saveListModal.value = true
    }

    const closeSaveListModal = () => {
        saveListModal.value = false
    }

    return {
        sidebarCollapsed,
        libraryTab,
        carouselIndex,
        saveListModal,
        user,
        toggleSidebar,
        openSaveListModal,
        closeSaveListModal
    }
}
