import { Colors } from './src/util/Colors';
import { Conta } from "./src/model/Conta";
import { Input } from "./src/util/Input";
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from './src/controller/ContaController';
import { formatarMoeda } from './src/util/Currency';

//Criar um Objeto Global da Classe ContaController
const contas = new ContaController();

//Criar um array contendo os tipos de conta
const tipoContas = [`Conta Corrente `, `Conta Poupança`];

export function main() {
    
    let opcao: number;

    criarContasTeste();

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
        console.log("            9 - Buscar conta por nome do titular     ");
        console.log("            0 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", 
        Colors.reset);

        console.log(Colors.fg.matrixGreenStrong + "Entre com a opção desejada: " + Colors.reset);
        opcao = Input.questionInt("");
    
        if (opcao === 0) {
            console.log(Colors.fg.matrixGreenStrong, "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(Colors.reset,"");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(Colors.fg.matrixGreenStrong, "\n\nCriar Conta\n\n", Colors.reset);
                    criarConta();
                keyPress()
                break;
            case 2:
                console.log(Colors.fg.matrixGreenStrong, "\n\nListar todas as Contas\n\n", Colors.reset);
                 listarTodasContas();
                keyPress()
                break;
            case 3:
                console.log(Colors.fg.matrixGreenStrong, "\n\nConsultar dados da Conta - por número\n\n", Colors.reset);
                    buscarContaPorNumero();
                keyPress()
                break;
            case 4:
                console.log(Colors.fg.matrixGreenStrong, "\n\nAtualizar dados da Conta\n\n", Colors.reset);
                atualizarConta();
                keyPress()
                break;
            case 5:
                console.log(Colors.fg.matrixGreenStrong, "\n\nApagar uma Conta\n\n", Colors.reset);
                    deletarContaPorNumero();
                keyPress()
                break;
            case 6:
                console.log(Colors.fg.matrixGreenStrong, "\n\nSaque\n\n", Colors.reset);
                sacar();
                keyPress()
                break;
            case 7:
                console.log(Colors.fg.matrixGreenStrong, "\n\nDepósito\n\n", Colors.reset);
                depositar();
                keyPress()
                break;
            case 8:
                console.log(Colors.fg.matrixGreenStrong, "\n\nTransferência entre Contas\n\n", Colors.reset);
                transferir();
                keyPress()
                break;
            case 9:
                console.log(Colors.fg.matrixGreenStrong, "\n\Consultar dados da Conta - por titular\n\n", Colors.reset);
                procurarPorTitular();
                keyPress()
                break;
            default:
                console.log(Colors.fg.matrixGreenStrong, "\nOpção Inválida!\n", Colors.reset);

                keyPress()
        }
        
        
    }
    
}

/* Opção 1: Criar uma nova Conta */
function criarConta() {
    console.log("Digite o número da agência: ");
    const agencia = Input.questionInt("");

    console.log("Digite o nome do titular: ");
    const titular = Input.question("");

    console.log("Selecione o tipo da conta: ");
    const tipo = Input.keyInSelect(tipoContas, "", {cancel: false}) + 1;

    console.log("Digite o saldo da conta: ");
    const saldo = Input.questionFloat("");

    switch (tipo) {
        case 1:
            console.log("Digite o limite da conta: ")
            const limite = Input.questionFloat("");
            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
            break;

     case 2:
            console.log("Digite o dia do aniversário da conta: ")
            const aniversario = Input.questionInt("");
            contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, titular, tipo, saldo, aniversario));       
            break;   
    }

}

/* Opção 2: Lista todas as contas cadastradas */

function listarTodasContas(): void{
    contas.listarTodas();
}

/* Opção 3: Procurar uma Conta pelo número */

function buscarContaPorNumero(): void{
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    contas.procurarPorNumero(numero);
}

/* Opção 4: Atualizar os dados de uma Conta */

function atualizarConta(): void{
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if(conta !== null){

        //Guarda os valores atuais da conta
        let agencia = conta.agencia;
        let titular = conta.titular;
        const tipo = conta.tipo;
        let saldo = conta.saldo;

        //Atualização da Agência
        console.log(`\nAgência Atual: ${agencia}`);
        console.log("Digite o número da nova Agência: ");
        console.log("Pressione o ENTER para manter o valor atual");
        agencia = Input.questionInt("", { defaultInput: agencia });

        //Atualização da Titular
        console.log(`\nNome do atual titular: ${titular}`);
        console.log("Digite o nome do titular: ");
        console.log("Pressione o ENTER para manter o valor atual");
        titular = Input.question("", { defaultInput: titular });

        //Atualização da Saldo
        console.log(`\nSaldo atual: ${formatarMoeda(saldo)}`);
        console.log("Digite o valor do nonvo saldo");
        console.log("Pressione o ENTER para manter o valor atual");
        saldo = Input.questionFloat("", { defaultInput: saldo });

        // Atualização do Tipo
        switch(tipo){
            case 1: { // Conta Corrente
                    let limite: number = (conta as ContaCorrente).limite;

                    // Atualização do Limite
                    console.log(`\nLimite Atual: ${formatarMoeda(limite)}`);
                    console.log("Digite o valor do novo limite: ");
                    console.log("Pressione o ENTER para manter o valor atual");
                    limite = Input.questionFloat("", { defaultInput: limite });

                    contas.atualizar(new ContaCorrente(
                        numero, agencia, titular, tipo, saldo, limite));
                    break;

                }case 2:{ // Conta Poupança
                    
                    let aniversario: number = (conta as ContaPoupanca).aniversario;

                    // Atualização do Aniversário
                    console.log(`\nAniversário Atual: ${aniversario}`);
                    console.log("Digite o novo dia do aniversário: ");
                    console.log("Pressione o ENTER para manter o valor atual");
                    aniversario = Input.questionInt("", { defaultInput: aniversario });
                    aniversario = Input.questionInt("", { defaultInput: aniversario });

                    contas.atualizar(new ContaPoupanca(
                        numero, agencia, titular, tipo, saldo, aniversario));
                    break;
                }
        }        

    }
    else{
        console.log(Colors.fg.matrixGreenStrong,`A conta número ${numero} não existe!`, Colors.reset);
    }
    

}

/* Opção 5: Deletar uma Conta pelo número */

function deletarContaPorNumero(): void{
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if(conta !== null){
        
        // Exibe a mensagem de confirmação da exclusão (Yes ou No)
        console.log(Colors.fg.whitestrong, 
            `\nTem certeza que deseja deletar a conta número ${numero} [y/n]?`, Colors.reset);
        const confirma = Input.keyInYNStrict(""); //Erro Property 'keyInYNStrict' does not exist on type 'typeof Input'

        // Se cofirmar (y), deleta a conta
        if (confirma)
            contas.deletar(numero);
        else
            console.log(Colors.fg.red,"\nOperação cancelada!", Colors.reset);
    

    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
    }

}


function sacar(): void{
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {
        console.log("Digite o valor do saque: ");
        const valor = Input.questionFloat("");

        contas.sacar(numero, valor);
    } else {
        console.log(`A conta número ${numero} não foi encontada!`)
    }

}

function depositar(): void{
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {
        console.log("Digite o valor do depósito: ");
        const valor = Input.questionFloat("");

        contas.depositar(numero, valor);
    } else {
        console.log(`A conta número ${numero} não foi encontada!`)
    }

}

function transferir(): void{
    console.log("Digite o número da conta de origem: ");
    const numeroOrigem = Input.questionInt("");

    console.log("Digite o número da conta de destino: ");
    const numeroDestino = Input.questionInt("");

    const contaOrigem = contas.buscarNoArray(numeroOrigem);
    const contaDestino = contas.buscarNoArray(numeroDestino);

    if (contaOrigem === null) {
        console.log(Colors.fg.matrixGreenStrong, `A Conta de Origem número ${numeroOrigem} não foi encontrada!`, Colors.reset)

    }else if (contaDestino === null) {
        
        console.log(Colors.fg.matrixGreenStrong, `A Conta de Destino número ${numeroDestino} não foi encontrada!`, Colors.reset)

    } else {
        console.log("Digite o valor da transferência: ");
        const valor = Input.questionFloat("");

        contas.transferir(numeroOrigem,numeroDestino, valor);
    }

}

function procurarPorTitular(): void{
    console.log("Digite o Nome do Titular: ");
    const titular = Input.question("");

    contas.procurarPorTitular(titular);
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
    Input.prompt();
}

function criarContasTeste(): void{
   
    // Instâncias da Classe ContaCorrente
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1,  1000.00, 100.00));
 
    //Instâncias da Classe ContaPoupança
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 10000, 10));
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));
 
}



main();