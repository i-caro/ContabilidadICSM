export interface FichaContable  {
    id?: string,
    clienteId: string,
    saldo: number,
    clienteNombre: string
}

export interface Transaccion{
    id?: string,
    clienteId: string,
    descripcion: string,
    monto: number,
    cantidad: number,
    pagado: boolean
}