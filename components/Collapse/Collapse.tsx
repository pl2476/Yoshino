
import {Component} from 'react';
import * as React from 'react';
import * as classNames from 'classnames';
import {IBaseComponent} from '../template/component';
import Panel from './Panel';
import {IPanelProps} from './Panel';

export interface ICollapseProps extends IBaseComponent {
  /**
   * 受控 - 激活key
   */
  activeKeys?: string[];
  /**
   * 非受控 - 激活key
   */
  defaultActiveKeys?: string[];
  /**
   * 手风琴模式
   */
  accordion?: boolean;
  /**
   * 变化回调
   */
  onChange?: (activeKeys: string[]) => void;
}

export interface ICollapseState {

}

/**
 * **折叠板**-可以放缩需要展示的内容区域。
 */
export class Collapse extends Component<ICollapseProps, ICollapseState> {
  static Panel: typeof Panel;

  static defaultProps = {
    defaultActiveKeys: [],
    accordion: false,
  };

  state = {
    activeKeys: this.props.defaultActiveKeys as string[],
  };

  getActiveKey = () => {
    const {activeKeys} = this.props;
    return activeKeys === undefined ? this.state.activeKeys : activeKeys;
  }

  onChange = (key: string) => {
    const activeKeys = this.getActiveKey();
    const {accordion} = this.props;
    if (activeKeys.indexOf(key) !== -1) {
      activeKeys.splice(activeKeys.indexOf(key), 1);
    } else {
      if (accordion) {
        activeKeys[0] = key;
      } else {
        activeKeys.push(key);
      }
    }
    this.onChangeTrigger(activeKeys);
  }

  onChangeTrigger = (activeKeys: string[]) => {
    const {onChange} = this.props;
    if (onChange) {
      onChange(activeKeys);
    }
    this.setState({
      activeKeys,
    });
  }

  render() {
    const {
      className, style, children,
      onChange, accordion, defaultActiveKeys,
      ...otherProps,
    } = this.props;
    const preCls = 'yoshino-collapse';
    const clsName = classNames(
      preCls, className,
    );
    const childrens = React.Children.toArray(children);
    const activeKeys = this.getActiveKey();
    return (
      <div
        className={clsName}
        style={style}
        {...otherProps}
      >
        {
          React.Children.map(childrens, (item: React.ReactElement<IPanelProps>, index) => {
            return React.cloneElement(item, {
              active: activeKeys.indexOf(item.props.keyId) !== -1,
              onChange: this.onChange,
              key: index,
            });
          })
        }
      </div>
    );
  }
}

export default Collapse;
