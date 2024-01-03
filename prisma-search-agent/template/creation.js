export default (email, password) => {
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

        <p class="mt-2 flex justify-center" style="color:#766c64"><strong>Tak fordi du har oprettet en søgeagent!</strong>
        </p>
        <p>Dine loginoplysninger er: <br> Email: ${email}, <br> Password: ${password}</p>

        <main class="mt-8">

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