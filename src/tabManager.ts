export class TabManager {
    private activeTab: string = "generators";

    constructor() {
        this.setupTabListeners();
        this.switchTab(this.activeTab);
    }

    private setupTabListeners(): void {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                if (tabId) {
                    this.switchTab(tabId);
                }
            });
        });
    }

    public switchTab(tabId: string): void {
        // Update active tab button
        document.querySelectorAll('.tab-button').forEach(button => {
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Show the selected tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            if (pane.id === `${tabId}-tab`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        this.activeTab = tabId;
    }
}
