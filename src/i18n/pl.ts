// Polish translations for PayloadCMS Admin UI
// Merge with the official PayloadCMS Polish translations
export const pl = {
  general: {
    dashboard: 'Panel główny',
    save: 'Zapisz',
    cancel: 'Anuluj',
    delete: 'Usuń',
    error: 'Błąd',
    published: 'Opublikowane',
    draft: 'Szkic',
    loading: 'Ładowanie...',
    confirmation: 'Potwierdzenie',
    submit: 'Wyślij',
    update: 'Aktualizuj',
    edit: 'Edytuj',
    create: 'Utwórz',
    back: 'Wróć',
    close: 'Zamknij',
    filter: 'Filtruj',
    yes: 'Tak',
    no: 'Nie',
    all: 'Wszystkie',
    none: 'Brak',
    view: 'Zobacz',
    enabled: 'Włączone',
    disabled: 'Wyłączone',
    showing: 'Wyświetlanie',
    of: 'z',
    results: 'wyników',
    previous: 'Poprzednia',
    next: 'Następna',
    lastEdited: 'Ostatnio edytowane',
    status: 'Status',
    selectOne: 'Wybierz jeden',
    selectMany: 'Wybierz wiele',
    addNew: 'Dodaj nowy',
    upload: 'Prześlij',
  },
  version: {
    draft: 'Szkic',
    published: 'Opublikowane',
    autosave: 'Autozapis',
    status: 'Status',
    lastSaved: 'Ostatnio zapisane',
    unsavedChanges: 'Niezapisane zmiany',
    untitled: 'Bez tytułu',
    workingDraft: 'Wersja robocza',
    publish: 'Publikuj',
    viewPublished: 'Zobacz opublikowane',
  },
  operations: {
    create: 'Utwórz',
    update: 'Aktualizuj',
    updateMany: 'Aktualizuj wiele',
    delete: 'Usuń',
    deleteMany: 'Usuń wiele',
    deleteCount: 'Usuń {{count}} element',
    deleteManyCount: 'Usuń {{count}} elementów',
    createSuccessful: 'Pomyślnie utworzono',
    updateSuccessful: 'Pomyślnie zaktualizowano',
    deleteSuccessful: 'Pomyślnie usunięto',
    createAnother: 'Utwórz kolejny',
    areYouSure: 'Czy na pewno?',
    areYouSureDesc: 'Ta operacja jest nieodwracalna.',
    confirmDeletion: 'Potwierdź usunięcie',
    noResults: 'Brak wyników',
    errors: {
      generic: 'Wystąpił błąd',
      invalidFileType: 'Nieprawidłowy typ pliku',
      maxFile: 'Plik jest zbyt duży',
    },
  },
  validation: {
    required: 'To pole jest wymagane',
    invalid: 'To pole jest nieprawidłowe',
    minLength: 'Minimalna liczba znaków to {{length}}',
    maxLength: 'Maksymalna liczba znaków to {{length}}',
    minValue: 'Minimalna wartość to {{value}}',
    maxValue: 'Maksymalna wartość to {{value}}',
    pattern: 'To pole nie pasuje do wzorca',
    unique: 'Ta wartość musi być unikalna',
    email: 'To pole musi być prawidłowym adresem e-mail',
    url: 'To pole musi być prawidłowym adresem URL',
  },
  collections: {
    pages: {
      label: 'Strony',
      singular: 'Strona',
      fields: {
        title: 'Tytuł',
        slug: 'Adres URL',
        status: 'Status',
        content: 'Treść',
        layout: 'Układ strony',
      },
    },
    media: {
      label: 'Media',
      singular: 'Medium',
      fields: {
        alt: 'Tekst alternatywny',
        caption: 'Podpis',
        filename: 'Nazwa pliku',
        filesize: 'Rozmiar pliku',
        width: 'Szerokość',
        height: 'Wysokość',
      },
    },
    mainMenu: {
      label: 'Menu',
      singular: 'Menu',
    },
    events: {
      label: 'Wydarzenia',
      singular: 'Wydarzenie',
      fields: {
        title: 'Tytuł',
        date: 'Data',
        time: 'Czas',
        location: 'Lokalizacja',
        description: 'Opis',
      }
    },
    members: {
      label: 'Członkowie',
      singular: 'Członek',
      fields: {
        name: 'Imię i nazwisko',
        email: 'Email',
        role: 'Rola',
        status: 'Status',
        joinDate: 'Data dołączenia',
      }
    },
    users: {
      label: 'Użytkownicy',
      singular: 'Użytkownik',
      fields: {
        email: 'Email',
        password: 'Hasło',
        name: 'Imię i nazwisko',
        roles: 'Role',
        verified: 'Zweryfikowany',
        active: 'Aktywny',
      }
    },
    "theme-settings": {
      label: 'Ustawienia motywu',
      singular: 'Ustawienia motywu',
    }
  },
  blocks: {
    hero: {
      label: 'Sekcja główna',
      fields: {
        heading: 'Nagłówek',
        subheading: 'Podtytuł',
        image: 'Zdjęcie w tle',
        buttons: 'Przyciski',
      },
    },
    content: {
      label: 'Treść',
      fields: {
        content: 'Treść',
      },
    },
    features: {
      label: 'Funkcje',
      fields: {
        heading: 'Nagłówek',
        features: 'Lista funkcji',
        title: 'Tytuł',
        description: 'Opis',
        icon: 'Ikona',
      },
    },
    cta: {
      label: 'Wezwanie do działania',
      fields: {
        heading: 'Nagłówek',
        subheading: 'Podtytuł',
        button: 'Przycisk',
        backgroundColor: 'Kolor tła',
      },
    },
  },
  fields: {
    id: 'ID',
    createdAt: 'Data utworzenia',
    updatedAt: 'Data aktualizacji',
    name: 'Nazwa',
    type: 'Typ',
    label: 'Etykieta',
    title: 'Tytuł',
    content: 'Treść',
    description: 'Opis',
    value: 'Wartość',
    visibility: 'Widoczność',
    url: 'URL',
    slug: 'Slug',
    color: 'Kolor',
    notes: 'Notatki',
    status: 'Status',
    image: 'Obraz',
    file: 'Plik',
    heading: 'Nagłówek',
    subheading: 'Podtytuł',
    text: 'Tekst',
    email: 'Email',
    phone: 'Telefon',
    address: 'Adres',
    date: 'Data',
    time: 'Czas',
    datetime: 'Data i czas',
    link: 'Link',
    links: 'Linki',
    button: 'Przycisk',
    buttons: 'Przyciski',
    settings: 'Ustawienia',
    enabled: 'Włączone',
    disabled: 'Wyłączone',
    options: 'Opcje',
    keywords: 'Słowa kluczowe',
    media: 'Media',
    user: 'Użytkownik',
    users: 'Użytkownicy',
    role: 'Rola',
    roles: 'Role',
    permissions: 'Uprawnienia',
    active: 'Aktywny',
    inactive: 'Nieaktywny',
    open: 'Otwarty',
    closed: 'Zamknięty',
    password: 'Hasło',
    confirmPassword: 'Potwierdź hasło',
    required: 'Wymagane',
    optional: 'Opcjonalne',
    default: 'Domyślne',
    metaTitle: 'Meta tytuł',
    metaDescription: 'Meta opis',
    metaKeywords: 'Meta słowa kluczowe',
    metaImage: 'Meta obraz',
    ogTitle: 'OG Title',
    ogDescription: 'OG Description',
    ogImage: 'OG Image',
    parent: 'Rodzic',
    children: 'Dzieci',
    position: 'Pozycja',
    order: 'Kolejność',
  },
  upload: {
    select: 'Wybierz plik',
    dragDrop: 'lub przeciągnij i upuść',
    maxSize: 'Maksymalny rozmiar: {{maxSize}}',
    uploading: 'Przesyłanie...',
    uploadError: 'Błąd przesyłania',
    uploadComplete: 'Przesyłanie zakończone',
    dimensions: 'Wymiary',
    width: 'Szerokość',
    height: 'Wysokość',
    replace: 'Zamień',
    download: 'Pobierz',
  },
  authentication: {
    login: 'Zaloguj się',
    logout: 'Wyloguj się',
    email: 'Email',
    password: 'Hasło',
    forgotPassword: 'Zapomniałeś hasła?',
    resetPassword: 'Zresetuj hasło',
    newPassword: 'Nowe hasło',
    confirmPassword: 'Potwierdź hasło',
    loginSuccessful: 'Logowanie pomyślne',
    loginFailed: 'Logowanie nieudane',
    accountLocked: 'Konto zablokowane',
    invalidCredentials: 'Nieprawidłowe dane logowania',
    passwordsMustMatch: 'Hasła muszą się zgadzać',
    passwordReset: 'Hasło zostało zresetowane',
    passwordResetRequest: 'Prośba o reset hasła została wysłana',
    yourEmail: 'Twój email',
    registration: 'Rejestracja',
    register: 'Zarejestruj się',
    alreadyHaveAccount: 'Masz już konto?',
    dontHaveAccount: 'Nie masz konta?',
    verifyEmail: 'Zweryfikuj swój email',
    verificationEmailSent: 'Email weryfikacyjny został wysłany',
    emailVerified: 'Email został zweryfikowany',
    verification: 'Weryfikacja',
    verificationCode: 'Kod weryfikacyjny',
    resendVerificationEmail: 'Wyślij ponownie email weryfikacyjny',
  },
  errors: {
    notFound: 'Nie znaleziono',
    unauthorized: 'Nieautoryzowany',
    forbidden: 'Zabronione',
    invalidRequest: 'Nieprawidłowe żądanie',
    serverError: 'Błąd serwera',
    networkError: 'Błąd sieci',
    tryAgain: 'Spróbuj ponownie',
    somethingWentWrong: 'Coś poszło nie tak',
    contactAdmin: 'Skontaktuj się z administratorem',
    pageNotFound: 'Strona nie znaleziona',
    returnHome: 'Wróć do strony głównej',
    invalidEntity: 'Nieprawidłowa encja',
    entityNotFound: 'Encja nie znaleziona',
    unsavedChanges: 'Niezapisane zmiany',
    confirmLeave: 'Czy na pewno chcesz opuścić tę stronę? Wszystkie niezapisane zmiany zostaną utracone.',
    maxFileSizeExceeded: 'Przekroczono maksymalny rozmiar pliku',
    invalidFileType: 'Nieprawidłowy typ pliku',
    uploadFailed: 'Przesyłanie nie powiodło się',
  },
  admin: {
    title: 'Panel administracyjny',
    dashboard: 'Panel główny',
    adminPanel: 'Panel administracyjny',
    welcome: 'Witaj',
    welcomeBack: 'Witaj z powrotem',
    navigation: 'Nawigacja',
    account: 'Konto',
    myAccount: 'Moje konto',
    userProfile: 'Profil użytkownika',
    settings: 'Ustawienia',
    siteSettings: 'Ustawienia strony',
    systemSettings: 'Ustawienia systemowe',
    actions: 'Akcje',
    preview: 'Podgląd',
    view: 'Zobacz',
    notifications: 'Powiadomienia',
    activity: 'Aktywność',
    recentActivity: 'Ostatnia aktywność',
    overview: 'Przegląd',
    statistics: 'Statystyki',
    help: 'Pomoc',
    documentation: 'Dokumentacja',
    about: 'O nas',
    version: 'Wersja',
    language: 'Język',
    theme: 'Motyw',
    darkMode: 'Tryb ciemny',
    lightMode: 'Tryb jasny',
    updates: 'Aktualizacje',
    noRecords: 'Brak rekordów do wyświetlenia',
    quickActions: 'Szybkie akcje',
    lastUpdated: 'Ostatnia aktualizacja',
    profile: 'Profil',
    search: 'Szukaj',
    searchResults: 'Wyniki wyszukiwania',
    advancedSearch: 'Wyszukiwanie zaawansowane',
    filter: 'Filtruj',
    filters: 'Filtry',
    clearFilters: 'Wyczyść filtry',
    layout: 'Układ',
    listView: 'Widok listy',
    gridView: 'Widok siatki',
    sortBy: 'Sortuj według',
    ascending: 'Rosnąco',
    descending: 'Malejąco',
    perPage: 'Na stronie',
    selectAll: 'Zaznacz wszystko',
    deselectAll: 'Odznacz wszystko',
    applyChanges: 'Zastosuj zmiany',
    discardChanges: 'Odrzuć zmiany',
    confirmDelete: 'Potwierdź usunięcie',
    itemsSelected: 'Wybrane elementy',
    bulkActions: 'Działania masowe',
    copyToClipboard: 'Kopiuj do schowka',
    copiedToClipboard: 'Skopiowano do schowka',
  },
  userMenu: {
    profile: 'Profil',
    settings: 'Ustawienia',
    documentation: 'Dokumentacja',
    logout: 'Wyloguj się',
  },
  livePreview: {
    desktop: 'Desktop',
    tablet: 'Tablet',
    mobile: 'Mobilny',
    showPreview: 'Pokaż podgląd',
    hidePreview: 'Ukryj podgląd',
    loading: 'Ładowanie podglądu...',
    previewError: 'Błąd ładowania podglądu',
    refreshPreview: 'Odśwież podgląd',
  },
  sidebar: {
    language: 'Język / Language',
    links: 'Przydatne Linki',
    homepage: 'Strona główna',
    documentation: 'Dokumentacja',
    graphQL: 'GraphQL Playground'
  }
}