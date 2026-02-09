import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { Colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";
import { Input } from "../util/Input";

export class ContaController implements ContaRepository{

    private listaContas = new Array<Conta>();

    public numero: number = 0;

    //Métodos do CRUD
    procurarPorNumero(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null)
            buscaConta.visualizar();
        else
            console.log(Colors.fg.red, "\nConta não encontrada!", Colors.reset);
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    procurarPorTitular(titular: string): void{
        const buscaPorTitular = this.listaContas.filter( conta => conta.titular.toLocaleUpperCase().includes(titular.toUpperCase()));

        if (buscaPorTitular.length > 0) {
            buscaPorTitular.forEach(conta => conta.visualizar());
        } else {
            console.log("Nenhuma conta foi encontrada!");
        }
    }

    

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(`\nA Conta número ${conta.numero} foi cadastrada com sucesso!`);
    }

    atualizar(conta: Conta): void {
        const buscaConta = this.buscarNoArray(conta.numero);

        if(buscaConta !== null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(`\nA Conta número ${conta.numero} foi atualizada com Sucesso!`);
        }
        else {
            console.log(`\nConta não encontrada!`);
        }
    }

    deletar(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null){
            
            let confirmarDelecao: string;
            console.log("Para confirmar deleção, digite o nome completo do titular:", buscaConta.titular);
            confirmarDelecao = Input.question("");
            if (confirmarDelecao.trim().toLowerCase() === buscaConta.titular.trim().toLowerCase()) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(Colors.fg.matrixGreenStrong, `\nA Conta número${numero} foi deletada com sucesso!`, Colors.reset);
                
            }else{
                console.log("Nome incorreto. Operação cancelada.");

            }
            // this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            // console.log(Colors.fg.matrixGreenStrong, `\nA Conta número${numero} foi deletada com sucesso!`, Colors.reset);
        }
        else{
            console.log(Colors.fg.red, "\nConta não encontrada!", Colors.reset);
        }
    }

    //Métodos Bancários
    sacar(numero: number, valor: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null){
            if (buscaConta.sacar(valor) === true) {
                console.log(`\nO saque no valor de ${formatarMoeda(valor)} na Conta número ${numero} foi realizada com sucesso!`);
            }
        }else{
            console.log(Colors.fg.red, "\nConta não encontrada!", Colors.reset);}
    }

    depositar(numero: number, valor: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null){
            buscaConta.depositar(valor)
                console.log(`\nO depósito no valor de ${formatarMoeda(valor)} na Conta número ${numero} foi realizada com sucesso!`);
            
        }else{
            console.log(Colors.fg.red, "\nConta não encontrada!", Colors.reset);}
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        const buscaContaOrigem = this.buscarNoArray(numeroOrigem);
        const buscaContaDestino = this.buscarNoArray(numeroDestino);
        if (buscaContaOrigem !== null && buscaContaDestino !== null) {
            if (buscaContaOrigem.sacar(valor) === true) {
                console.log(`\nA tranferência no valor ${formatarMoeda(valor)} da Conta número ${numeroOrigem} para a conta número ${numeroDestino} foi feita com sucesso!`);
            }
        }
    }
    
    //Métodos Auxiliares
    public gerarNumero(): number{
        return ++ this.numero;
    }

    public buscarNoArray(numero: number): Conta | null{
        for (let conta of this.listaContas) {
            if (conta.numero === numero) {
                return conta;
            }
            
        }
        return null;
    }
}