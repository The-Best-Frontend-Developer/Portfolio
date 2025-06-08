import type {Metadata} from "next";
import {Geist_Mono, Neucha} from "next/font/google";
import "./globals.css";

const neucha = Neucha({
    subsets: ['cyrillic'],
    variable: '--font-neucha',
    weight: '400',
})

const geist_mono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono'
})

export const metadata: Metadata = {
    title: "Портфолио",
    description: "Портфолио frontend разработчика",
    icons: {
        icon: '/favicon.svg',
    },
    openGraph: {
        title: 'Портфолио Frontend разработчика',
        description: 'Караваев Кирилл владеет полным стеком технологий для написания качественных интерфейсов',
        url: 'https://frontend-developer-portfolio-2010.vercel.app',
        images: [
            {
                url: 'https://frontend-developer-portfolio-2010.vercel.app/preview-photo.jpg',
                width: 1200,
                height: 630,
                alt: 'Фото превью',
            }
        ]
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${neucha.variable} ${geist_mono.variable}`}>
        <body
            className={`text-text font-main bg-background antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
