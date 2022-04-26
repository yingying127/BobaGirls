import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Teas = ({ teas }) => {
  return (
     <ul className='teaproducts'>
        {
          teas.map(tea => {
            return (
               <li className='teadiv' key={tea.id}>
                 <img src={tea.imageUrl} />
                 <Link to={`/tea/${ tea.id }`}>
                   { tea.teaname }
                 </Link>

                 <div className='teaprice'>
                  ${tea.price}
                 </div>

                 <button id='addtocart'>Add To Cart</button>
               </li>
            )
          })
        }
     </ul>
  )
}

const mapState = ({ teas }) => {
  return {
    teas
  }
}

export default connect(mapState)(Teas);

// class Teas extends Component {
//     constructor(props) {
//         super(props);
//         // this.state = {
//         //     teaList: []
//         // }
//         // this.getTeas = this.getTeas.bind(this)
//     }
//     // async getTeas() {
//     //     const response = await axios.get('/api/teas')
//     //     this.setState({ teaList: [response.data] })
//     // }
//     componentDidMount() {
//         // this.getTeas()
//         this.props.fetchAllTeas()
//         console.log(this.props)
//     }
//     render() {
//         // const { teaList } = this.state
//         // console.log(teaList)
//         const { teas } = this.props;
//         // console.log(teas)
//         return (
//             <div>
//                 hello
//                 {/* {teas.length}
//                 {
//                     teas.map(tea => {
//                         <li key={tea.id}>
//                             {tea.teaname}
//                         </li>
//                     })
//                 } */}
//             </div>
//         )
//     }
// }

// const mapState = ({teas}) => {
//     return {
//         teas
//     }
// }

// const mapDispatch = (dispatch) => {
//     return {
//         fetchAllTeas: () => dispatch(fetchAllTeas)
//     }
// }

// export default connect(mapState, mapDispatch)(Teas)