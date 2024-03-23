import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

interface CarouselBoxProps {
    collegeName: string;
  }

export default function CarouselBox(props: CarouselBoxProps) {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
    

    return(
        <div>
            <p className='text-primary-300 px-4 py-2 text-xl font-semibold'>Latest events in {props.collegeName}</p>
            <Carousel sx={{width: "90vw", margin: "auto"}} autoPlay={true} swipe={true} indicators={true} navButtonsAlwaysVisible={true} cycleNavigation={true} animation='slide'>
            {
                items.map( (item, i) => 
                <div key={i}>
                    <Paper>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
            
                        <Button className="CheckButton">
                            Check it out!
                        </Button>
                    </Paper>
                </div> 
            )}
            </Carousel>
        </div>
    )
}