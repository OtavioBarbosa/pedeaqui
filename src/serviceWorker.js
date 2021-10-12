export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(function (registration) {
                console.log('ServiceWorker SUCESSO')
            }).catch(function (error) {
                console.log('ServiceWorker FALHA: ', error)
            })
        })
    }
}  