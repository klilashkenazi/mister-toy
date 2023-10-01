export function ToyMsgsPreview({ msg }) {
    return (
        <section>
            <h5>{msg.by.fullname}</h5>
            <p>{msg.txt}</p>
        </section>
    )

}