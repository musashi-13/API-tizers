function SidebarCard(props) {
    return (
      <div className="SidebarCard" style={{ background: props.linearGradient }}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h1 style={{margin:0}}>{props.EventName}</h1>
        </div>
        <p style={{marginTop:0, marginBottom: '1em', fontSize:'14px', textTransform: "uppercase"}}>{props.EventFrom} to {props.EventTo}</p>
        <button className="sideregButton">
            <a href={props.RegLink} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              Closing Soon..
            </a>
          </button>
      </div>
    );
}

export default SidebarCard
