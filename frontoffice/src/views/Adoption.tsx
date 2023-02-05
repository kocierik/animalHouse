import React from "react"

const Adoption = () => {
    return <>
        <div className="h-full" data-aos="fade-up" data-aos-duration="500">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex mt-8  justify-between" style={{ flexFlow: 'wrap' }}>
                        <h1 className="text-2xl font-semibold mb-5 leading-tight">Adoption</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 -mx-4 mt-10 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div>
                            <p className="mb-4">
                                Adopting animals is an important and rewarding choice. Not only does it provide a loving home for a creature in need, but it can also bring a sense of purpose and joy to the adopter's life.
                            </p>
                            <p className="mb-4">
                                Adopting an animal from a shelter or rescue organization can help reduce the number of animals who are euthanized each year due to overpopulation. By giving a homeless animal a second chance, adopters are also making room for more animals to be taken in and cared for.
                            </p>
                            <p className="mb-4">
                                Furthermore, owning a pet can have numerous benefits for one's physical and mental health. Studies have shown that pet owners have lower blood pressure, decreased risk of heart disease, and increased levels of serotonin and oxytocin, which can lead to improved mood and reduced stress.
                            </p>
                            <p className="mb-4">
                                Adopting an animal can also teach responsibility and compassion. Caring for a pet requires commitment and daily effort, and can help teach children the importance of taking care of another living being.
                            </p>
                            <p className="mb-4">
                                In summary, adopting an animal is not only an act of kindness but it can also bring numerous benefits to the adopter and their community.
                            </p>
                        </div>
                        <div>
                            <img alt="help dog" className="rounded-xl mb-10" src="https://static.lav.it/image/full/34920b7962b4c32d31e9d8199ae0aed0/page-blocks-extra/adozioni-dirette.png?v=4" />
                            <img alt="help monkey" className="rounded-xl" src="https://static.lav.it/image/medium/f5460ba9285577fd9fa8b8c159802903/page-blocks-extra/adozione-distanza-3.jpg" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Adopt a new friend via our partner LAV</h2>
                        <div className="m-4 flex flex-wrap justify-center items-center">
                            <img alt="lav associate" style={{ height: '15rem', width: '21rem' }} src="https://static.lav.it/images/logo/lav.svg" />
                            <div className="grid grid-row-2 gap-6 m-4">
                                <a href="https://amarefabene.lav.it/">
                                    <div className="bg-indigo-800 p-6 rounded-xl text-white font-black shadow">
                                        <h3 className="text-xl font-bold text-center">Direct adoption</h3>
                                    </div>
                                </a>
                                <a href="https://adozioneadistanza.lav.it/">
                                    <div className="bg-blue-600 p-6 rounded-xl text-white font-black shadow">
                                        <h3 className="text-xl text-center font-bold">Distance adoption</h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Adoption