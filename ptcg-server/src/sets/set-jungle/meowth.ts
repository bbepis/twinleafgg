import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage } from '../../game/store/card/card-types';
import { Attack } from '../../game/store/card/pokemon-types';
import { CoinFlipPrompt } from '../../game/store/prompts/coin-flip-prompt';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';
import { GameMessage } from '../../game';

export class Meowth extends PokemonCard {

  public name = 'Meowth';

  public cardImage: string = 'assets/cardback.png';

  public set = 'JU';

  public setNumber = '56';

  public fullName = 'Meowth JU';

  public cardType = C;

  public stage = Stage.BASIC;

  public hp = 50;

  public weakness = [{ type: F }];

  public resistance = [{ type: P, value: -30 }];

  public retreat = [C];

  public attacks: Attack[] = [
    {
      name: 'Pay Day',
      cost: [C, C],
      damage: 10,
      damageCalculation: 'x',
      text: 'Flip a coin. If heads, draw a card.'
    }
  ];

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      return store.prompt(state, [
        new CoinFlipPrompt(effect.player.id, GameMessage.COIN_FLIP),
      ], (results) => {
        player.deck.moveTo(player.hand, 1);
      });
    }

    return state;
  }

}
