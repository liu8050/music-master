var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IonicNativePlugin, cordova } from '@ionic-native/core';
import { Injectable } from '@angular/core';
var QQSDK = /** @class */ (function (_super) {
    __extends(QQSDK, _super);
    function QQSDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * QQ Share Scene
         */
        _this.Scene = {
            QQ: 0,
            QQZone: 1,
            Favorite: 2
        };
        /**
         *  client type:  QQ application or TIM application
         */
        _this.ClientType = {
            QQ: 0,
            TIM: 1
        };
        return _this;
    }
    QQSDK.prototype.ssoLogin = function (options) { return cordova(this, "ssoLogin", { "callbackOrder": "reverse" }, arguments); };
    QQSDK.prototype.logout = function () { return cordova(this, "logout", { "callbackOrder": "reverse" }, arguments); };
    QQSDK.prototype.checkClientInstalled = function (options) { return cordova(this, "checkClientInstalled", { "callbackOrder": "reverse" }, arguments); };
    QQSDK.prototype.shareText = function (options) { return cordova(this, "shareText", { "callbackOrder": "reverse" }, arguments); };
    QQSDK.prototype.shareImage = function (options) { return cordova(this, "shareImage", { "callbackOrder": "reverse" }, arguments); };
    QQSDK.prototype.shareNews = function (options) { return cordova(this, "shareNews", { "callbackOrder": "reverse" }, arguments); };
    QQSDK.prototype.shareAudio = function (options) { return cordova(this, "shareAudio", { "callbackOrder": "reverse" }, arguments); };
    QQSDK.pluginName = "QQSDK";
    QQSDK.plugin = "cordova-plugin-qqsdk";
    QQSDK.pluginRef = "QQSDK";
    QQSDK.repo = "https://github.com/iVanPan/Cordova_QQ";
    QQSDK.platforms = ["Android", "iOS"];
    QQSDK.install = "ionic cordova plugin add cordova-plugin-qqsdk --variable QQ_APP_ID=YOUR_QQ_APPID";
    QQSDK.installVariables = ["QQ_APP_ID"];
    QQSDK = __decorate([
        Injectable()
    ], QQSDK);
    return QQSDK;
}(IonicNativePlugin));
export { QQSDK };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3Fxc2RrL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQW1LaEIseUJBQWlCOzs7UUFFMUM7O1dBRUc7UUFDSCxXQUFLLEdBQUc7WUFDTixFQUFFLEVBQUUsQ0FBQztZQUNMLE1BQU0sRUFBRSxDQUFDO1lBQ1QsUUFBUSxFQUFFLENBQUM7U0FDWixDQUFDO1FBQ0Y7O1dBRUc7UUFDSCxnQkFBVSxHQUFHO1lBQ1gsRUFBRSxFQUFFLENBQUM7WUFDTCxHQUFHLEVBQUUsQ0FBQztTQUNQLENBQUM7OztJQVVGLHdCQUFRLGFBQUMsT0FBdUI7SUFPaEMsc0JBQU07SUFZTixvQ0FBb0IsYUFBQyxPQUF1QjtJQVk1Qyx5QkFBUyxhQUFDLE9BQXVCO0lBWWpDLDBCQUFVLGFBQUMsT0FBdUI7SUFZbEMseUJBQVMsYUFBQyxPQUF1QjtJQVlqQywwQkFBVSxhQUFDLE9BQXVCOzs7Ozs7OztJQTdGdkIsS0FBSztRQURqQixVQUFVLEVBQUU7T0FDQSxLQUFLO2dCQXBLbEI7RUFvSzJCLGlCQUFpQjtTQUEvQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUVFTaGFyZU9wdGlvbnMge1xuXG4gIC8qKlxuICAgKiBUaGUgY2xpbmV0IHR5cGUsIFFRIG9yIFRJTVxuICAgKiBEZWZhdWx0IGlzIFFRXG4gICAqL1xuICBjbGllbnQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBTaGFyZSBTZW5jZVxuICAgKiBEZWZhdWx0IGlzIFFRXG4gICAqL1xuICBzY2VuZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHRleHQgZm9yIHNoYXJlVGV4dFxuICAgKi9cbiAgdGV4dD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHVybCBmb3Igc2hhcmUgbmV3cyBvciBhdWRpb1xuICAgKi9cbiAgdXJsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdGl0bGUgZm9yIHNoYXJlIGltYWdlLG5ld3Mgb3IgYXVkaW9cbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVzY3JpcHRpb24gZm9yIHNoYXJlIGltYWdlLG5ld3Mgb3IgYXVkaW9cbiAgICovXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgaW1hZ2UgZm9yIHNoYXJlIGltYWdlLG5ld3Mgb3IgYXVkaW9cbiAgICogSW1hZ2Ugc3VwcG9ydHMgdGhyZWUgdHlwZXM6XG4gICAqIDEuIE5ldHdvcmsgVVJMXG4gICAqIDIuIEJhc2U2NFxuICAgKiAzLiBBYnNvbHV0ZSBmaWxlIHBhdGhcbiAgICovXG4gIGltYWdlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiAgVGhlIFVSTCBmb3IgYXVkaW9cbiAgICovXG4gIGZsYXNoVXJsPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBuYW1lIFFRU0RLXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgUGx1Z2luIGlzIGEgd3JhcHBlciBhcm91bmQgdGhlIFRlbmNlbnQgUVEgU0RLIGZvciBBbmRyb2lkIGFuZCBpT1MuIFByb3ZpZGVzIGFjY2VzcyB0byBRUSBzc29Mb2dpbiwgUVEgU2hhcmluZywgUVFab25lIFNoYXJpbmcgZXRjLlxuICpcbiAqIFJlcXVpcmVzIENvcmRvdmEgcGx1Z2luOiBgY29yZG92YS1wbHVnaW4tcXFzZGtgLiBGb3IgbW9yZSBpbmZvLCBwbGVhc2Ugc2VlIHRoZSBbUVFTREsgcGx1Z2luIGRvY3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9pVmFuUGFuL0NvcmRvdmFfUVEpLlxuICpcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgUVFTREssIFFRU2hhcmVPcHRpb25zIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9xcXNkay9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgcXE6IFFRU0RLKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogY29uc3Qgb3B0aW9uczogUVFTaGFyZU9wdGlvbnMgPSB7XG4gKiAgIGNsaWVudDogdGhpcy5xcS5DbGllbnRUeXBlLlFRLFxuICogICBzY2VuZTogdGhpcy5xcS5TY2VuZS5RUSxcbiAqICAgdGl0bGU6ICdUaGlzIGlzIGEgdGl0bGUgZm9yIGNvcmRvdmEtcGx1Z2luLXFxc2RrJyxcbiAqICAgdXJsOiAnaHR0cHM6Ly9jb3Jkb3ZhLmFwYWNoZS5vcmcvJyxcbiAqICAgaW1hZ2U6ICdodHRwczovL2NvcmRvdmEuYXBhY2hlLm9yZy9zdGF0aWMvaW1nL2NvcmRvdmFfYm90LnBuZycsXG4gKiAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyAgQ29yZG92YSBRUSBzaGFyZSBkZXNjcmlwdGlvbicsXG4gKiAgIGZsYXNoVXJsOiAgJ2h0dHA6Ly9zdHJlYW0yMC5xcW11c2ljLnFxLmNvbS8zMDU3NzE1OC5tcDMnLFxuICogfVxuICpcbiAqIGNvbnN0IGNsaWVudE9wdGlvbnM6IFFRU2hhcmVPcHRpb25zID0ge1xuICogICBjbGllbnQ6IHRoaXMucXEuQ2xpZW50VHlwZS5RUSxcbiAqIH1cbiAqXG4gKiBjb25zdCBzaGFyZVRleHRPcHRpb25zOiBRUVNoYXJlT3B0aW9ucyA9IHtcbiAqICAgY2xpZW50OiB0aGlzLnFxLkNsaWVudFR5cGUuUVEsXG4gKiAgIHRleHQ6ICdUaGlzIGlzIFNoYXJlIFRleHQnLFxuICogICBzY2VuZTogdGhpcy5xcS5TY2VuZS5RUSxcbiAqIH1cbiAqXG4gKiB0aGlzLnFxLnNzb0xvZ2luKGNsaWVudE9wdGlvbnMpXG4gKiAgICAudGhlbihyZXN1bHQgPT4ge1xuICogICAgICAgLy8gU3VjY2Vzc1xuICogICAgICAgY29uc29sZS5sb2coJ3Rva2VuIGlzICcgKyByZXN1bHQuYWNjZXNzX3Rva2VuKTtcbiAqICAgICAgIGNvbnNvbGUubG9nKCd1c2VyaWQgaXMgJyArIHJlc3VsdC51c2VyaWQpO1xuICogICAgICAgY29uc29sZS5sb2coJ2V4cGlyZXNfdGltZSBpcyAnICsgbmV3IERhdGUocGFyc2VJbnQocmVzdWx0LmV4cGlyZXNfdGltZSkpICsgJyBUaW1lU3RhbXAgaXMgJyArIHJlc3VsdC5leHBpcmVzX3RpbWUpO1xuICogICAgfSlcbiAqICAgIC5jYXRjaChlcnJvciA9PiB7XG4gKiAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7IC8vIEZhaWxlZFxuICogICAgfSk7XG4gKlxuICogdGhpcy5xcS5sb2dvdXQoKVxuICogICAgLnRoZW4oKCkgPT4ge1xuICogICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBzdWNjZXNzJyk7XG4gKiAgICB9KVxuICogICAgLmNhdGNoKGVycm9yID0+IHtcbiAqICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAqICAgIH0pO1xuICpcbiAqIHRoaXMucXEuY2hlY2tDbGllbnRJbnN0YWxsZWQoY2xpZW50T3B0aW9ucylcbiAqICAgIC50aGVuKCgpID0+IHtcbiAqICAgICAgIGNvbnNvbGUubG9nKCdJbnN0YWxsZWQnKTtcbiAqICAgIH0pXG4gKiAgICAuY2F0Y2goKCkgPT4ge1xuICogICAgICAgY29uc29sZS5sb2coJ05vdCBJbnN0YWxsZWQnKTtcbiAqICAgIH0pO1xuICpcbiAqIHRoaXMucXEuc2hhcmVUZXh0KHNoYXJlVGV4dE9wdGlvbnMpXG4gKiAgICAudGhlbigoKSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmxvZygnc2hhcmVUZXh0IHN1Y2Nlc3MnKTtcbiAqICAgIH0pXG4gKiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICogICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICogICAgfSk7XG4gKlxuICogdGhpcy5xcS5zaGFyZUltYWdlKG9wdGlvbnMpXG4gKiAgICAudGhlbigoKSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmxvZygnc2hhcmVJbWFnZSBzdWNjZXNzJyk7XG4gKiAgICB9KVxuICogICAgLmNhdGNoKGVycm9yID0+IHtcbiAqICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAqICAgIH0pO1xuICogfVxuICpcbiAqIHRoaXMucXEuc2hhcmVOZXdzKG9wdGlvbnMpXG4gKiAgICAudGhlbigoKSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmxvZygnc2hhcmVOZXdzIHN1Y2Nlc3MnKTtcbiAqICAgIH0pXG4gKiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICogICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICogICAgfSk7XG4gKiB9XG4gKlxuICogdGhpcy5xcS5zaGFyZUF1ZGlvKG9wdGlvbnMpXG4gKiAgICAudGhlbigoKSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmxvZygnc2hhcmVBdWRpbyBzdWNjZXNzJyk7XG4gKiAgICB9KVxuICogICAgLmNhdGNoKGVycm9yID0+IHtcbiAqICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAqICAgIH0pO1xuICpcbiAqIGBgYFxuICpcbiAqIEBpbnRlcmZhY2VzXG4gKiBRUVNoYXJlT3B0aW9uc1xuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ1FRU0RLJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tcXFzZGsnLFxuICBwbHVnaW5SZWY6ICdRUVNESycsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vaVZhblBhbi9Db3Jkb3ZhX1FRJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJ10sXG4gIGluc3RhbGw6ICdpb25pYyBjb3Jkb3ZhIHBsdWdpbiBhZGQgY29yZG92YS1wbHVnaW4tcXFzZGsgLS12YXJpYWJsZSBRUV9BUFBfSUQ9WU9VUl9RUV9BUFBJRCcsXG4gIGluc3RhbGxWYXJpYWJsZXM6IFsnUVFfQVBQX0lEJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFFRU0RLIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBRUSBTaGFyZSBTY2VuZVxuICAgKi9cbiAgU2NlbmUgPSB7XG4gICAgUVE6IDAsXG4gICAgUVFab25lOiAxLFxuICAgIEZhdm9yaXRlOiAyXG4gIH07XG4gIC8qKlxuICAgKiAgY2xpZW50IHR5cGU6ICBRUSBhcHBsaWNhdGlvbiBvciBUSU0gYXBwbGljYXRpb25cbiAgICovXG4gIENsaWVudFR5cGUgPSB7XG4gICAgUVE6IDAsXG4gICAgVElNOiAxXG4gIH07XG5cbiAgLyoqXG4gICAqIG9wZW4gUVEgb3IgVElNIGNsaWVudCBwZXJmb3JtIHNzb0xvZ2luXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3VjY2VzcyByZXR1cm4sIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZSdcbiAgfSlcbiAgc3NvTG9naW4ob3B0aW9uczogUVFTaGFyZU9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZSdcbiAgfSlcbiAgbG9nb3V0KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiB0aGUgUVEgYXBwbGljYXRpb24gb3IgVElNIGFwcGxpY2F0aW9uIGlzIGluc3RhbGxlZCBvbiB0aGUgZGV2aWNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN1Y2Nlc3MgcmV0dXJuLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tPcmRlcjogJ3JldmVyc2UnXG4gIH0pXG4gIGNoZWNrQ2xpZW50SW5zdGFsbGVkKG9wdGlvbnM6IFFRU2hhcmVPcHRpb25zKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogc2hhcmVUZXh0XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3VjY2VzcyByZXR1cm4sIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZSdcbiAgfSlcbiAgc2hhcmVUZXh0KG9wdGlvbnM6IFFRU2hhcmVPcHRpb25zKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogc2hhcmVJbWFnZVxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN1Y2Nlc3MgcmV0dXJuLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tPcmRlcjogJ3JldmVyc2UnXG4gIH0pXG4gIHNoYXJlSW1hZ2Uob3B0aW9uczogUVFTaGFyZU9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaGFyZU5ld3NcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdWNjZXNzIHJldHVybiwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrT3JkZXI6ICdyZXZlcnNlJ1xuICB9KVxuICBzaGFyZU5ld3Mob3B0aW9uczogUVFTaGFyZU9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaGFyZUF1ZGlvXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3VjY2VzcyByZXR1cm4sIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZSdcbiAgfSlcbiAgc2hhcmVBdWRpbyhvcHRpb25zOiBRUVNoYXJlT3B0aW9ucyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=