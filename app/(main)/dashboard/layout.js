import { Suspense } from 'react'
import React from 'react'
import DashboardPage from './page'
import { BarLoader } from 'react-spinners'

const DashboardLayout = () => {
    return (
        <div>
            <div className=''>
                <h1 className='text-6xl font-bold mb-5 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600'>
                    Dashboard
                </h1>
            </div>

            {/* Dashboard Page */}
            <Suspense
                fallback={<BarLoader className='mt-4' width={"100%"} color="#9333ea" />}
            >
                <DashboardPage />
            </Suspense>
        </div>
    )
}

export default DashboardLayout
