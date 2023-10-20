import { brailleToText } from "../brailleService";

describe("test that strong contractions and wordsigns and groupsigns are respected", () => {
  it('test that "and" can be translated', () => {
    const andStrongGroupsign = brailleToText("⠯");
    const expected = "and";
    expect(andStrongGroupsign).toBe(expected);
  });

  it('can translate weather with strong groupsign', () => {
    const weatherWithTHEStrongContraction = brailleToText('⠺⠑⠁⠮⠗')
    expect(weatherWithTHEStrongContraction).toBe('weather')
  })
});


describe("check that lower wordsigns and wordsigns work", () => {
  it('can translate the ea lower groupsign', () => {
    const beaver = brailleToText("⠃⠂⠧⠑⠗")
    expect(beaver).toBe('beaver')
  })
})