const router = require('express').Router()




const Patient = require('../models/Patient')


//funcao assincrona
router.post('/', async (req, res) => {

    const { id, name, healthInsuranceCardId, address, createdAt } = req.body

    //verifica se esta enviando os dados,cadastrando

    if (!name) {
        res.status(422).json({ error: 'o name é obrigatorio' })
        return
    }
    if (!healthInsuranceCardId) {
        res.status(422).json({ error: 'o healthInsuranceCardId é obrigatorio' })
        return
    }
    if (!address) {
        res.status(422).json({ error: 'o endereço é obrigatorio' })
        return
    }
    if (!createdAt) {
        res.status(422).json({ error: 'A data é obrigatorio' })
        return
    }
    //req.body
    const patient = {
        // id,
        name,
        healthInsuranceCardId,
        address,
        createdAt
    }

    //create do mongosse cria no banco mas pode dar erro
    //por isso criamos o try catch pra ter um controle

    try {
        //criando dados no mongo db
        await Patient.create(patient)
        res.status(201).json({ message: 'Paciente inserido no sistema com sucesso' })
        res.status(200).json({ patient })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Read -leitura de dados
router.get('/', async (req, res) => {

    try {
        const patients = await Patient.find()

        res.status(200).json(patients)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {


    const id = req.params.id

    try {
        const patient = await Patient.findOne({ _id: id })

        if (!patient) {
            res.status(422).json({ message: "Paciente nao encontrado no sistema!" })
            return
        }

        res.status(200).json(patient)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//UPDATE (PUT/PATCH)

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, healthInsuranceCardId, address, createdAt } = req.body


    const patient = {
        name,
        healthInsuranceCardId,
        address,
        createdAt,
    }

    try {
        const updatePatient = await Patient.updateOne({ _id: id }, patient)

        if (!updatePatient.matchedCount === 0) {
            res.status(422).json({ message: "Paciente nao encontrado no sistema!" })
            return
        }

        res.status(200).json({ patient })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


//DELETAR UM PACIENTE
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const patient = await Patient.findOne({ _id: id })

    if (!patient) {
        res.status(422).json({ message: "Paciente nao encontrado no sistema!" })
        return
    }
    try {

        await Patient.deleteOne({ _id: id })

        res.status(200).json({ message: "O paciente foi removido do sistema com sucesso!" })

    } catch (error) {
        res.status(500).json({ error: error })

    }



}


)

module.exports = router