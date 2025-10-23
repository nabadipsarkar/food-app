import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
export default function ExploreMenu({category,setCategory}) {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h2>Explore our menu</h2>
            <p>A menu list showcases available dishes and drinks, guiding customers through flavors, <br/>choices, and prices for a satisfying dining experience.</p>
            <div className='menu-list' >
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="menu-list-item">
                                <img className={category === item.menu_name?"active":""} src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr></hr>
        </div>
    )
}