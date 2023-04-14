export default function Form (props) {

    return (
        <form className={props.className} onSubmit={props.onSubmit} encType="multipart/form-data">
            {props.children}
        </form>
    )
}