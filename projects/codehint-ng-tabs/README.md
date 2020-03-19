# @codehint-ng/tabs

A simple flexible tabs Angular component to group content with tabs.

## Usage
1) Register the @codehint-ng/tabs in your module:

        import { CngTabsModule } from '@codehint-ng/tabs';

        @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            CngTabsModule,
            ...
        ],
        ...

2) Use components in your Angular application:

        <cng-tabs>
          <cng-tab #tabFirst>First Tab Title</cng-tab>
          <cng-tab #tabSecond>Second Tab Title</cng-tab>
        </cng-tabs>

        <div [cngTabContentOf]="tabFirst">First Tab Content</div>
        <div [cngTabContentOf]="tabSecond">First Tab Content</div>
