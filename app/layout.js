import './globals.css'

export const metadata = {
  title: '플래시 키즈 - 유아용 플래시 게임',
  description: '1~7세 아이들을 위한 재미있는 교육 게임'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout ({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-kids min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
