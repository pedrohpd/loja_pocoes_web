import { Model, DataTypes } from "sequelize"
import sequelize from "../connection.js"

class Potion extends Model {}
Potion.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        photo: { type: DataTypes.STRING },
        value: { type: DataTypes.INTEGER },
    },
    { sequelize: sequelize, timestamps: false },
)

// Sincroniza a tabela com o banco de dados
await Potion.sync()

// Injeção dados iniciais na tabela
async function seed() {
    try {
        const count = await Potion.count();
        
        // Só realiza os inserts se a tabela estiver vazia
        if (count === 0) {
            await Potion.bulkCreate([
                {
                    name: "Poção Blue Sky",
                    description: " Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds",
                    photo: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
                    value: 300
                },
                {
                    name: "Poção do Perfume Misterioso",
                    description: " Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos",
                    photo: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
                    value: 200
                },
                {
                    name: "Poção de Pinus",
                    description: "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos",
                    photo: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
                    value: 3000
                },
                {
                    name: "Poção da Beleza Eterna",
                    description: "Veneno que mata rápido",
                    photo: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
                    value: 100
                },
                {
                    name: "Poção do Arco Íro",
                    description: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias",
                    photo: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
                    value: 120
                },
                {
                    name: "Caldeirão das Verdades Secretas",
                    description: "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
                    photo: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
                    value: 150
                }
            ]);
        }
    } catch (error) {
        console.error("Erro ao rodar os inserts base:", error);
    }
}

await seed()

export default Potion