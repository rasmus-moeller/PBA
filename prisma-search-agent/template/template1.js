export default (context) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
    </style>
</head>

<body>
    <section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <header class="flex justify-center">
            <div></div>
            <a href="https://anotherslegacy.dk">
                <img class="w-auto"
                    src="https://d3k81ch9hvuctc.cloudfront.net/company/W7wZ4d/images/7b0d4bad-ff12-409c-a01a-c686b870c7f7.png"
                    alt="">
            </a>
        </header>

        <hr>

        <p class="mt-2 flex justify-center" style="color:#766c64"><strong>Produkter som matcher din søgeagent er på
                lager!</strong>
        </p>

        <main class="mt-8">
            <div class="container mx-auto mt-8 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="https://example.com/redirect1" target="_blank">
                        <img src="https://cdn.shopify.com/s/files/1/0627/5927/2676/products/IMG_0076-2_9af9af25-e90a-48e2-9321-d8f77ce39ec3.jpg?v=1691836181"
                            alt="Image 1" class="max-w-xs mx-auto" style="max-width: 125px; max-height: 125px;">
                    </a>

                    <a href="https://example.com/redirect2" target="_blank">
                        <img src="https://cdn.shopify.com/s/files/1/0627/5927/2676/products/1._IMG_0274-2.jpg?v=1691566573"
                            alt="Image 2" class="max-w-xs mx-auto" style="max-width: 125px; max-height: 125px;">
                    </a>

                    <a href="https://example.com/redirect3" target="_blank">
                        <img src="https://cdn.shopify.com/s/files/1/0627/5927/2676/products/1._IMG_0062-2.jpg?v=1691836170"
                            alt="Image 3" class="max-w-xs mx-auto" style="max-width: 125px; max-height: 125px;">
                    </a>

                    <a href="https://example.com/redirect3" target="_blank">
                        <img src="https://cdn.shopify.com/s/files/1/0627/5927/2676/products/1._IMG_0062-2.jpg?v=1691836170"
                            alt="Image 3" class="max-w-xs mx-auto" style="max-width: 125px; max-height: 125px;">
                    </a>
                </div>
            </div>

            <hr>

            <p class="mt-8 flex justify-center" style="text-align: center;">Kom forbi vores showroom og prøv vores
                smykker eller gå på opdagelse i
                vores unikke smykke univers på vores hjemmeside.
            </p>

            <div class="w-full flex justify-center">
                <p class="mt-8 text-xs w-8/12 flex justify-center" style="text-align: center; "><i>Psst.. Husk at vi
                        ofte
                        kun
                        har
                        ét af
                        hvert
                        smykke.. Så vær' hurtig hvis du finder det du drømmer om.</i>
                </p>
            </div>



        </main>


        <footer class="mt-8">
        </footer>
    </section>
</body>

</html>`
}