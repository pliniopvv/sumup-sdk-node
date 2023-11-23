import SumUp from "../components/SumUp"

describe('SumUp', () => {
    test('.me()', () => {
        let su = new SumUp();
        expect(su.me()).not.toBeNull();
    })
})