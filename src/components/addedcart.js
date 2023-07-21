import React from 'react'
import { connect } from 'react-redux'

import { Delfun } from '../redux/addedaction'

const Addedcart = ({addeddata,Delfun}) => {
  console.log('data cart added ad',addeddata)

  console.log('images',addeddata[0].recipe)





  return (
    <div>

      {addeddata.lenght &&
        addeddata.map(
          <div>

            {/* <h4>{addeddata.recipe.image}</h4> */}
            {/* <img src={addeddata.recipe.image} alt="" /> */}

          </div>

        )
      }



    </div>
  )
}

const mapStateToProps = (state) =>{return {addeddata:state.Addedcart}}

const mapDispatchToProps = {Delfun}

export default connect(mapStateToProps,mapDispatchToProps) (Addedcart)