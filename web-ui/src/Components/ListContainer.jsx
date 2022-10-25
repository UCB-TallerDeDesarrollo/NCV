
import Container from './Container';

export default function ListContainer({children,title=null,header=null}) {
  return (
        <Container>
          <div style={{ marginBottom: 10,display:'flex', alignItems:'center', flexDirection:'row', width:'100%',justifyContent:'space-between' }}>
              <h4 style={{margin:0,padding:0}}>{title}</h4>
              {header}
            </div>
            {children}
        </Container>
  );
}