const Mensajes = () => {
  const texto =
    "2/4/2019 11:14 James Gosling: The only thing out of that project that survived was Java. But it was directed at a set of pain points that happened to be about people who were living outside of data centers";
    // const [antes,despues]=texto.split(" ")
    let separado=texto.split(" ").slice(0,4)
    let segunda_parte=texto.split(" ").slice(4,texto.split(" ").length).join(" ")
    // console.log(separado,segunda_parte)
    const mensajes={
      fecha:separado[0],
      hora:separado[1],
      nombre:separado[2]+" "+separado[3],
      mensaje:segunda_parte
    }
    // console.log(mensajes)
  return <div></div>;
};

export default Mensajes;
