import { Conta } from "./Conta";

export class ContaPoupanca extends Conta{

    private _aniversario: number;


	constructor(
        numero: number,
        agencia: number,
        titular: string,
        tipo: number,
        saldo: number,
        aniversario: number) {
        super(numero,agencia, titular, tipo, saldo);
		this._aniversario = aniversario;
	}

	public get aniversario(): number {
		return this._aniversario;
	}

	public set aniversario(value: number) {
		this._aniversario = value;
	}

    public visualizar(): void {
        super.visualizar();
        console.log(`Aniversário: ${this.aniversario}`);
    }

}