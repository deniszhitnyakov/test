export default {
  methods: {
    selectItem(cab, state) {
        let selected = [];
        selected = selected.concat(this.selected);

        if (state) {
          selected.push(cab);
        } else {
          selected = selected.filter(selectedCab => {
            if (selectedCab.id === cab.id) return false;
            return true;
          });
        }
        this.$store.dispatch('cabs/saveSelectedCabs', selected);
      },

      selectAll() {
        if (arguments[0]['value']) {
          this.$store.dispatch('cabs/saveSelectedCabs', arguments[0]['items']);
        } else {
          this.$store.dispatch('cabs/saveSelectedCabs', []);
        }
      }
  }
};