import { sidebarLinks } from '../../constants/index';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
type LinkGenType = {
  label: string;
  isActive: boolean;
  route: string;
  isChild: boolean;
  noChild: boolean;
  handleExpandCollabse: Function;
  isExpanded: boolean;
};
const LinkGen = ({
  label,
  isActive,
  route,
  isChild = false,
  noChild = false,
  handleExpandCollabse,
  isExpanded = false,
}: LinkGenType) => {
  return (
    <Link
      to={route}
      key={label}
      // prefetch={noChild ? false : true}
      className={`${
        isActive ? 'bg-blue-400' : ' '
      }  text-white text-[12px] hover:bg-blue-400 flex-between`}
    >
      <p
        className={`${isActive ? 'base-bold' : 'base-medium'} ${
          isChild ? 'pl-10' : ''
        } py-2 px-5 `}
      >
        {label}
      </p>
      <div className='mr-3'>
        {' '}
        {!noChild && (
          <div onClick={() => handleExpandCollabse(label)}>
            {isExpanded ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}{' '}
          </div>
        )}
      </div>
    </Link>
  );
};
const LeftSidebar = () => {
  const pathname = useLocation();
  const { sidebar } = useSelector((state: any) => state.toggle);

  const [sidebarStates, setSidebarStates] = useState(null);

  useEffect(() => {
    const mainHeadings = sidebarLinks.filter(
      (item: any) => item.children === null
    );
    const obj = {};
    for (let i = 0; i < mainHeadings.length; i++) {
      //@ts-ignore
      obj[mainHeadings[i].label] = 'none';
    }

    // @ts-ignore
    setSidebarStates(obj);
  }, []);

  const handleExpandCollabse = (label: string) => {
    setSidebarStates({
      // @ts-ignore
      ...sidebarStates,
      [label]: sidebarStates?.[label] !== 'block' ? 'block' : 'none',
    });
  };
  return (
    <div>
      {sidebarLinks.map((item: any) => {
        let isActive = pathname === item.route;

        if (item.children) {
          return (
            <>
              <LinkGen
                key={item.label}
                isActive={isActive}
                label={item.label}
                route={'#'}
                handleExpandCollabse={handleExpandCollabse}
                isExpanded={sidebarStates?.[item.label] === 'block'}
                isChild={false}
                noChild={false}
              />
              <div style={{ display: sidebarStates?.[item.label] || 'none' }}>
                {item.children.map((child: any) => {
                  isActive = pathname === child.route;
                  return (
                    <LinkGen
                      key={item.label + child.label}
                      isActive={isActive}
                      label={child.label}
                      route={child.route}
                      isChild={true}
                      noChild={true}
                      handleExpandCollabse={() => {}}
                      isExpanded={false}
                    />
                  );
                })}
              </div>
            </>
          );
        } else {
          return (
            <LinkGen
              key={item.label}
              label={item.label}
              isActive={isActive}
              route={item.route}
              isChild={false}
              noChild={true}
              handleExpandCollabse={() => {}}
              isExpanded={false}
            />
          );
        }
      })}
    </div>
  );
};

export default LeftSidebar;
