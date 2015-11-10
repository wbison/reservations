<?php
/*
Plugin Name: Nappkin
Plugin URI: http://www.nappkin.nl
Description: Nappkin
Author: Nappkin
Version: 1.0
Author URI: http://www.nappkin.nl
*/
// Block direct requests
if ( !defined('ABSPATH') )
	die('-1');


add_action( 'widgets_init', function(){
     register_widget( 'Nappkin' );
});
/**
 * Adds My_Widget widget.
 */
class Nappkin extends WP_Widget {
	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'Nappkin', // Base ID
			__('Nappkin', 'text_domain'), // Name
			array( 'description' => __( 'Nappkin reservation widget', 'text_domain' ), ) // Args
		);

        wp_enqueue_script(
               'nappkin_api',
               plugins_url( 'js/nappkin_api.js', __FILE__ ),
               array(),
               false,
               true
           );
		wp_enqueue_script(
         'nappkin',
         plugins_url( 'js/nappkin.js', __FILE__ ),
         array('jquery'),
         false,
         true
     );
		wp_enqueue_style('nappkin_css', plugins_url('css/nappkin.css',__FILE__ ));
	}
	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {

     	echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ). $args['after_title'];
		}
		echo __( 'Hello, World!', 'text_domain' );
		echo $args['after_widget'];
		$this->html();
	}

	private function html() {
		?>

        <div class="reserver" name="rtool" id="rtool">
            <div class="reservePart">
                <div class="part_title_inactive" name="head_personen" id="head_personen">
                    <div class="drop_disabled" id='drop0' name='drop0'>&nbsp;</div>
                    <a href="#" class='part_title_copy'>Aantal personen: <span name='persons' id='persons'>-</span></a>
                </div>
              <div class="part_content" name="person_content" id='person_content'> Voor hoeveel personen wilt u reserveren?<br><br>
                    <span class="personlist" name="p1" id="p1">1</span>
                    <span class="personlist" name="p2" id="p2">2</span>
                    <span class="personlist" name="p3" id="p3">3</span>
                    <span class="personlist" name="p4" id="p4">4</span>
                    <span class="personlist" name="p5" id="p5">5</span>
                    <span class="personlist" name="p7" id="p7">6+</span>
                    <div name="groepletop" id="groepletop" class='letop'><strong>LET OP:</strong> Bij een reservering van zes personen of meer is de door u opgegeven data <strong>GEEN</strong> reservering. Wij gebruiken uw ingevoerde gegevens om u terug te bellen en de reservering te bevestigen.</div>
                </div>
            </div>
            <div class="reservePart">
                <div class="part_title_inactive" name="head_datum" id="head_datum">
                    <div class="drop_disabled" id='drop1' name='drop1'>&nbsp;</div>
                    <a href="#" class='part_title_copy'>Datum: <span name='datum' id='datum'>-</span></a><div class="tijdindex">Tijd: <span name='tijd' id='tijd'>-</span></div>
                </div>
              <div class="part_content" name="datum_content" id="datum_content">
                    Op welke dag wilt u reserveren?<br><br>
                    <table width="464" border="0" cellspacing="2" cellpadding="0">
                          <tr class="kvt">
                            <td colspan="2" align="left" class="mndSelect"><a href="#" name="maandprev" id="maandprev">&laquo; Eerder</a></td>
                            <td colspan="3" align="center"><span class="mdnNaam" name="maandnaam" id="maandnaam">MAAND</span></td>
                            <td colspan="2" align="right" class="mndSelect"><a href="#" name="maandnext" id="maandnext">Later &raquo;</a></td>
                          </tr>
                          <tr class="kvh">
                            <td align="center" class="kvh">Ma</td>
                            <td align="center" class="kvh">Di</td>
                            <td align="center" class="kvh">Wo</td>
                            <td align="center" class="kvh">Do</td>
                            <td align="center" class="kvh">Vr</td>
                            <td align="center" class="kvh">Za</td>
                            <td align="center" class="kvh">Zo</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" colspan="2" class="kvh2">Lunch</td>
                          </tr>
                          <tr>
                            <td align="center" name="dt0" id="dt0" class="kv">&nbsp;</td>
                            <td align="center" name="dt1" id="dt1" class="kv">&nbsp;</td>
                            <td align="center" name="dt2" id="dt2" class="kv">&nbsp;</td>
                            <td align="center" name="dt3" id="dt3" class="kv">&nbsp;</td>
                            <td align="center" name="dt4" id="dt4" class="kv">&nbsp;</td>
                            <td align="center" name="dt5" id="dt5" class="kv">&nbsp;</td>
                            <td align="center" name="dt6" id="dt6" class="kv">&nbsp;</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" name="slot1" id="slot1" class="kvtm">12:00</td>
                            <td align="center" name="slot2" id="slot2" class="kvtm">12:30</td>
                          </tr>
                          <tr>
                            <td align="center" name="dt7" id="dt7" class="kv">&nbsp;</td>
                            <td align="center" name="dt8" id="dt8" class="kv">&nbsp;</td>
                            <td align="center" name="dt9" id="dt9" class="kv">&nbsp;</td>
                            <td align="center" name="dt10" id="dt10" class="kv">&nbsp;</td>
                            <td align="center" name="dt11" id="dt11" class="kv">&nbsp;</td>
                            <td align="center" name="dt12" id="dt12" class="kv">&nbsp;</td>
                            <td align="center" name="dt13" id="dt13" class="kv">&nbsp;</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" name="slot3" id="slot3" class="kvtm">13:00</td>
                            <td align="center" name="slot4" id="slot4" class="kvtm">13:30</td>
                          </tr>
                          <tr>
                            <td align="center" name="dt14" id="dt14" class="kv">&nbsp;</td>
                            <td align="center" name="dt15" id="dt15" class="kv">&nbsp;</td>
                            <td align="center" name="dt16" id="dt16" class="kv">&nbsp;</td>
                            <td align="center" name="dt17" id="dt17" class="kv">&nbsp;</td>
                            <td align="center" name="dt18" id="dt18" class="kv">&nbsp;</td>
                            <td align="center" name="dt19" id="dt19" class="kv">&nbsp;</td>
                            <td align="center" name="dt20" id="dt20" class="kv">&nbsp;</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" colspan="2" class="kvh2">Diner</td>
                          </tr>
                          <tr>
                            <td align="center" name="dt21" id="dt21" class="kv">&nbsp;</td>
                            <td align="center" name="dt22" id="dt22" class="kv">&nbsp;</td>
                            <td align="center" name="dt23" id="dt23" class="kv">&nbsp;</td>
                            <td align="center" name="dt24" id="dt24" class="kv">&nbsp;</td>
                            <td align="center" name="dt25" id="dt25" class="kv">&nbsp;</td>
                            <td align="center" name="dt26" id="dt26" class="kv">&nbsp;</td>
                            <td align="center" name="dt27" id="dt27" class="kv">&nbsp;</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" name="slot4" id="slot5" class="kvtm">18:00</td>
                            <td align="center" name="slot5" id="slot6" class="kvtm">18:30</td>
                          </tr>
                          <tr>
                            <td align="center" name="dt28" id="dt28" class="kv">&nbsp;</td>
                            <td align="center" name="dt29" id="dt29" class="kv">&nbsp;</td>
                            <td align="center" name="dt30" id="dt30" class="kv">&nbsp;</td>
                            <td align="center" name="dt31" id="dt31" class="kv">&nbsp;</td>
                            <td align="center" name="dt32" id="dt32" class="kv">&nbsp;</td>
                            <td align="center" name="dt33" id="dt33" class="kv">&nbsp;</td>
                            <td align="center" name="dt34" id="dt34" class="kv">&nbsp;</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" name="slot6" id="slot7" class="kvtm">19:00</td>
                            <td align="center" name="slot7" id="slot8" class="kvtm">19:30</td>
                          </tr>
                          <tr>
                            <td align="center" name="dt35" id="dt35" class="kv">&nbsp;</td>
                            <td align="center" name="dt36" id="dt36" class="kv">&nbsp;</td>
                            <td align="center" name="dt37" id="dt37" class="kv">&nbsp;</td>
                            <td align="center" name="dt38" id="dt38" class="kv">&nbsp;</td>
                            <td align="center" name="dt39" id="dt39" class="kv">&nbsp;</td>
                            <td align="center" name="dt40" id="dt40" class="kv">&nbsp;</td>
                            <td align="center" name="dt41" id="dt41" class="kv">&nbsp;</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" name="slot8" id="slot9" class="kvtm">20:00</td>
                            <td align="center" name="slot9" id="slot10" class="kvtm">20:30</td>
                          </tr>
                          <tr>
                          <td align="center" name="dt35" id="dt35" class="kv">&nbsp;</td>
                            <td align="center" name="dt36" id="dt36" class="kv">&nbsp;</td>
                            <td align="center" name="dt37" id="dt37" class="kv">&nbsp;</td>
                            <td align="center" name="dt38" id="dt38" class="kv">&nbsp;</td>
                            <td align="center" name="dt39" id="dt39" class="kv">&nbsp;</td>
                            <td align="center" name="dt40" id="dt40" class="kv">&nbsp;</td>
                            <td align="center" name="dt41" id="dt41" class="kv">&nbsp;</td>
                            <td align="center" class="kvs">&nbsp;</td>
                            <td align="center" name="slot8" id="slot11" class="kvtm">21:00</td>
                            <td align="center" name="slot9" id="slot12" class="kvtm">21:30</td>
                          </tr>
                    </table><br>
                </div>
            </div>
            <div class="reservePart">
                <div class="part_title_inactive" name="head_persoon" id="head_persoon">
                    <div class="drop_disabled" id='drop2' name='drop2'>&nbsp;</div>
                    <a href="#" class='part_title_copy'>Persoonsgegevens: <span name='persoon' id='persoon'>-</span></a>
                </div>
            <div class="part_content" name="persoon_content" id="persoon_content">
            Vul hieronder uw gegevens in:<br>
              <table class="persoon_table" width="470" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>Naam:<br><input name="nam" id="nam" type="text" class="txt_single" tabindex="1" value=""></td>
                    <td rowspan="3" valign="top">Opmerking:<br>
                    <textarea type="textarea" name="noot" id="noot" class="txt_noot" tabindex="4" value=""></textarea></td>
                  </tr>
                  <tr>
                    <td>Email adres:<br><input nam="eml" id="eml" type="text" class="txt_single"  tabindex="2" value=""></td>
                    </tr>
                  <tr>
                    <td>Telefoon:<br><input nam="tel" id="tel" type="text" class="txt_single"  tabindex="3" value=""></td>
                    </tr>
                  </table>
                  <div style="padding:0 0 5px;"><input type="checkbox" name="infoaan" id="infoaan" value="0" tabindex="5">Ja, ik ontvang graag nieuws over restaurant Adam</div>

                <div name="subButton" id="subButton" class="verstuur_inactive"><div class="drop_verstuur_inactive" id='Div1' name='drop2'>&nbsp;</div><a href="#" name="verst" id="verst" class="verstuur_a" tabindex="6">VERSTUREN</a></div>
                <div name="foutmsg" id="foutmsg" class="fout_msg">De gegevens zijn nog niet compleet</div>
            </div>
          </div>
        <div class="reservePart">
                <div class="part_title_inactive" name="head_summary" id="head_summary">
                    <div class="drop_disabled" id='drop3' name='drop3'>&nbsp;</div>
                    <a href="#" class='part_title_copy'>bevestiging</a>
                </div>
            <div class="part_content" name="summary_content" id="summary_content"></div>
          </div>
        </div>

		<?php
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		if ( isset( $instance[ 'locationId' ] ) ) {
			$locationId = $instance[ 'locationId' ];
		}
		else {
			$locationId = __( 'Location', 'text_domain' );
		}
		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'locationId' ); ?>"><?php _e( 'Location:' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'locationId' ); ?>" name="<?php echo $this->get_field_name( 'locationId' ); ?>" type="text" value="<?php echo esc_attr( $locationId ); ?>">
		</p>
		<?php
	}
	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['locationId'] = ( ! empty( $new_instance['locationId'] ) ) ? strip_tags( $new_instance['locationId'] ) : '';
		return $instance;
	}
} // class My_Widget