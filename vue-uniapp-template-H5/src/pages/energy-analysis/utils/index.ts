// 背景图
import EcTypeAllBg from '../../../assets/images/energy-analysis/ea-bg-type-all.png';
import EcTypeElectricityBg from '../../../assets/images/energy-analysis/ea-bg-type-electricity.png';
import EcTypeWaterBg from '../../../assets/images/energy-analysis/ea-bg-type-water.png';
import EcTypeGasBg from '../../../assets/images/energy-analysis/ea-bg-type-gas.png';
import EcTypeSteamBg from '../../../assets/images/energy-analysis/ea-bg-type-steam.png';
import { Common_EEnergyCode } from '@/config/enum';

/**
 * 根据能源类型返回背景图
 * @param {string} code
 * @returns {string}
 */
export const mapEnergyAnalysisBgImage = (code: string): string => {
  let bgImage = EcTypeAllBg;
  switch (code) {
    case Common_EEnergyCode.电:
      bgImage = EcTypeElectricityBg;
      break;
    case Common_EEnergyCode.水:
      bgImage = EcTypeWaterBg;
      break;
    case Common_EEnergyCode.燃气:
      bgImage = EcTypeGasBg;
      break;
    case Common_EEnergyCode.蒸汽:
      bgImage = EcTypeSteamBg;
      break;
    case Common_EEnergyCode.总能耗:
    default:
      bgImage = EcTypeAllBg;
      break;
  }
  return `url(${bgImage})`;
};
