import snackBarMessage from "./snackbar-message"

export default ({ message }) => snackBarMessage(
    `Something went wrong. (${message})`,
)
