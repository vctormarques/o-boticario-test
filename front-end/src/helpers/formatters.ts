import { ChangeEvent } from "react";
import { masker } from "./masker";

export const FormatFieldMoney = (
    event: ChangeEvent<HTMLInputElement>
): void => {
    event.target.value = masker.money(event.target.value);
}

export const FormatFieldCpf = (
    event: ChangeEvent<HTMLInputElement>
): void => {
    event.target.value = masker.cpf(event.target.value);
}

export const FormatFieldPhone = (
    event: ChangeEvent<HTMLInputElement>
): void => {
    event.target.value = masker.phone(event.target.value);
}

