"use client"

import { useState, useEffect } from 'react';


export interface itmeInterface { type: string, name: string }


export default function Home() {
  const [mainItems, setMainItems] = useState<itmeInterface[]>([
    {
      type: 'Fruit',
      name: 'Apple',
    },
    {
      type: 'Vegetable',
      name: 'Broccoli',
    },
    {
      type: 'Vegetable',
      name: 'Mushroom',
    },
    {
      type: 'Fruit',
      name: 'Banana',
    },
    {
      type: 'Vegetable',
      name: 'Tomato',
    },
    {
      type: 'Fruit',
      name: 'Orange',
    },
    {
      type: 'Fruit',
      name: 'Mango',
    },
    {
      type: 'Fruit',
      name: 'Pineapple',
    },
    {
      type: 'Vegetable',
      name: 'Cucumber',
    },
    {
      type: 'Fruit',
      name: 'Watermelon',
    },
    {
      type: 'Vegetable',
      name: 'Carrot',
    },
  ]);
  const [items, setItems] = useState<itmeInterface[]>([]);
  const [shouldRemoveItems, setShouldRemoveItems] = useState(false);

  const menus = ['Fruit', 'Vegetable']

  const moveButton = (item: itmeInterface) => {
    setMainItems([...mainItems.filter(mainItem => mainItem.name !== item.name)]);
    setItems(prevList => [...prevList, item]);
    setShouldRemoveItems(true);
  };

  const moveToMain = (item: itmeInterface) => {
    setItems([...items.filter(e => e.name !== item.name)]);
    setMainItems(prevList => [...prevList, item]);
    setShouldRemoveItems(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let currentIndex = 0;

    const removeItemSequentially = () => {
      timeoutId = setTimeout(() => {
        if (items?.[0])
          setMainItems(prevList => [...prevList, items[0]]);
        setItems(prevList => prevList.slice(1));

        currentIndex++;
        if (currentIndex < items.length) {
          removeItemSequentially();
        } else {
          setShouldRemoveItems(false);
        }
      }, 5000);
    };

    if (shouldRemoveItems) {
      removeItemSequentially();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [shouldRemoveItems, items]);

  return (
    <Layout>
      <div className='h-full w-full flex gap-5 p-5'>
        <div className='w-1/3 '>
          {mainItems.map((item, index) => (
            <div className='box-item' key={`main-item-${index}`} onClick={() => moveButton(item)}>
              {item.name}
            </div>
          ))}
        </div>

        {menus.map((menu, menuIndex) => {
          let _items = items.filter(e => e.type === menu) || []
          return <div className='w-1/3 border-2 border-gray-200 relative' key={`box-itme-${menu}-${menuIndex}`}>
            <div className='bg-gray-100 p-2 text-center w-full h-10'>{menu}</div>
            <div className='w-full absolute left-0 bottom-0 top-10 p-2 overflow-auto'>
              {_items.map((item, index) => (
                <div className='box-item' key={`itme-${menu}-${menuIndex}-${index}`} onClick={() => moveToMain(item)}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        })}

      </div>
    </Layout>
  );
};


export const Layout = (props: any) => {
  return (
    <div className='w-screen h-screen min-h-screen overflow-hidden max-w-screen'>
      <div className="flex w-full h-full shadow">
        <div className="relative w-auto bg-[#EAF1FB]">
        </div>
        <div className="w-full h-full overflow-auto">
          {props.children}
        </div>
      </div>

    </div>
  )
}
