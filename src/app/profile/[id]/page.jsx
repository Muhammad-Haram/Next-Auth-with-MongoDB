export default function page({ params }) {
    return (
        <div className="bg-gray-50 font-[sans-serif]">

            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">

                <div className="w-full">
                    <h2 className="text-gray-800 text-center text-2xl font-bold">Profile Page</h2>
                    <h1 className="text-blue-600 ml-1 whitespace-nowrap font-semibold text-center mt-3">{params.id}</h1>
                </div>
            </div>
        </div>
    );
}