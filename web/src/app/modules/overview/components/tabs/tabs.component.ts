import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { View } from 'src/app/models/content';
import { ViewUtil } from 'src/app/util/view';

interface Tab {
  name: string;
  view: View;
  accessor: string;
}

@Component({
  selector: 'app-object-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnChanges, OnInit {
  @Input() title: string;
  @Input() views: View[];

  tabs: Tab[] = [];
  activeTab: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const { queryParams } = this.activatedRoute.snapshot;
    if (queryParams.tabView) {
      this.activeTab = queryParams.tabView;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.views.currentValue) {
      const views = changes.views.currentValue as View[];
      this.tabs = views.map((view) => {
        const vu = new ViewUtil(view);
        const title = vu.titleAsText();
        return {
          name: title,
          view,
          accessor: view.metadata.accessor,
        };
      });

      if (!this.activeTab) {
        this.activeTab = this.tabs[0].accessor;
      }
    }
  }

  identifyTab(index: number, item: Tab): string {
    return item.name;
  }

  clickTab(tabAccessor: string) {
    if (this.activeTab === name) {
      return;
    }
    this.activeTab = tabAccessor;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      replaceUrl: true,
      queryParams: { tabView: tabAccessor },
      queryParamsHandling: 'merge',
    });
  }
}