import CustomDropDown from '@/components/CustomDropDown'
import Image from 'next/image'

// ECEEF4

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CustomDropDown/>
      <code>
        let name = `&quot`Mohamed
      </code>
    </main>
  )
}
