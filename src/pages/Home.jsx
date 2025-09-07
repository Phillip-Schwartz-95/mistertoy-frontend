import { useTranslation } from 'react-i18next'

export function Home() {
    const { t } = useTranslation()

    return (
        <>
            <section className='home'>
                <h1>{t('welcome')}</h1>
                <p>{t('instructions')}</p>
            </section>
        </>
    )
}
