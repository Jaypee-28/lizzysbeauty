import { settingRepository } from "./setting.repository";
import { UpdateSettingsInput } from "./setting.schema";

export class SettingService {
  async getSettings() {
    return settingRepository.getSettings();
  }

  async updateSettings(data: UpdateSettingsInput) {
    return settingRepository.updateSettings(data);
  }

}

export const settingService = new SettingService();
