import rl from "readline-sync";
import { Colors } from './src/util/Colors';
import { Conta } from "./src/model/Conta";

export function main() {
    
    let opcao: number;

    //Instanciar objetos da Classa Conta
    const c1 = new Conta(1, 1234, "Sofia", 1, 100000.00);

    //Testes do Método Sacar
    console.log("Sacar R$100,00: ", c1.sacar(100.00));
    console.log("Sacar R$200.000,00: ", c1.sacar(200000.00));
    console.log("Sacar R$0,00: ", c1.sacar(0.00));

    //Testes do Método Depositar
    console.log("Depositar R$0,00: ");
    c1.depositar(-10.00);

    console.log("Depositar R$500,00: ");
    c1.depositar(500.00);

    c1.visualizar();

    while (true) {
        
        console.log(Colors.bg.black, Colors.fg.matrixGreenStrong, 
                    "\n*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            0 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", 
        Colors.reset);

        opcao = rl.questionInt(Colors.fg.matrixGreenStrong + "Entre com a opção desejada: " + Colors.reset);

    
        if (opcao === 0) {
            console.log(Colors.fg.matrixGreenStrong, "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(Colors.reset,"");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(Colors.fg.matrixGreenStrong, "\n\nCriar Conta\n\n", Colors.reset);
                
                keyPress()
                break;
            case 2:
                console.log(Colors.fg.matrixGreenStrong, "\n\nListar todas as Contas\n\n", Colors.reset);

                keyPress()
                break;
            case 3:
                console.log(Colors.fg.matrixGreenStrong, "\n\nConsultar dados da Conta - por número\n\n", Colors.reset);

                keyPress()
                break;
            case 4:
                console.log(Colors.fg.matrixGreenStrong, "\n\nAtualizar dados da Conta\n\n", Colors.reset);

                keyPress()
                break;
            case 5:
                console.log(Colors.fg.matrixGreenStrong, "\n\nApagar uma Conta\n\n", Colors.reset);

                keyPress()
                break;
            case 6:
                console.log(Colors.fg.matrixGreenStrong, "\n\nSaque\n\n", Colors.reset);

                keyPress()
                break;
            case 7:
                console.log(Colors.fg.matrixGreenStrong, "\n\nDepósito\n\n", Colors.reset);

                keyPress()
                break;
            case 8:
                console.log(Colors.fg.matrixGreenStrong, "\n\nTransferência entre Contas\n\n", Colors.reset);

                keyPress()
                break;
            default:
                console.log(Colors.fg.matrixGreenStrong, "\nOpção Inválida!\n", Colors.reset);

                keyPress()
        }
        
        
    }
    
}

function sobre(): void {
        console.log(Colors.bg.black, Colors.fg.matrixGreenStrong,
                    "\n*****************************************************");
        console.log("\nProjeto Desenvolvido por: ");
        console.log("Matheus Moura Bastos - matheusm.bastos@hotmail.com");
        console.log("github.com/bastosmatheusm");
        console.log("\n*****************************************************",
        Colors.reset);        
    }

function keyPress(): void {
    console.log(Colors.fg.matrixGreenStrong,"\nPressione enter para continuar...", Colors.reset);
    rl.prompt();
}

main();